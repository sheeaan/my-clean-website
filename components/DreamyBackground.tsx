'use client'

import { useEffect, useRef, useCallback, useState } from 'react'

// =============================================================================
// Types
// =============================================================================

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  life: number
  maxLife: number
  isAmbient: boolean
}

interface GridPoint {
  baseX: number
  baseY: number
  x: number
  y: number
  vx: number
  vy: number
  /** Resting points skip physics entirely — only the cursor can wake them. */
  asleep: boolean
}

/**
 * The dot grid is a regular lattice, so a point's index is derivable from its
 * coordinates. That lets the cursor wake only the points it can actually reach
 * instead of testing all of them every frame.
 */
interface Grid {
  points: GridPoint[]
  cols: number
  rows: number
  spacing: number
}

interface MouseState {
  x: number
  y: number
  vx: number
  vy: number
}

// =============================================================================
// Helpers
// =============================================================================

/** Detect low-end devices: mobile/tablet or small screens */
function isLowEndDevice() {
  if (typeof window === 'undefined') return false
  // Check for touch-primary device (mobile/tablet)
  const isTouch = window.matchMedia('(pointer: coarse)').matches
  // Small screens
  const isSmall = window.innerWidth < 768
  return isTouch || isSmall
}

// =============================================================================
// Constants (adjusted per device tier)
// =============================================================================

const DISTORTION_RADIUS = 80
const DISTORTION_STRENGTH = 12
const SPRING_STRENGTH = 0.05
const DAMPING = 0.85
const TAU = Math.PI * 2
const DOT_RADIUS = 0.6
const DOT_ALPHA = 0.35

/**
 * Half-width of the box erased from the cached layer under a moving point.
 * Must exceed DOT_RADIUS (so the cached dot is fully removed) and stay well
 * under half the grid spacing (so a neighbour's dot is never clipped).
 */
const CLEAR_HALF = 2

/**
 * A point sleeps once it is this close to base with this little velocity.
 * Damping only approaches zero asymptotically, so without a cutoff a point
 * would never come to rest.
 *
 * Measured worst-case drift against the un-culled version is 3.1e-4 px — an
 * order of magnitude under the ~1/256 px step canvas anti-aliasing can even
 * represent, so no pixel can differ. Idle drift is exactly zero.
 */
const REST_EPSILON = 1e-4

/** Ambient particles are batched into fixed opacity bins to cut fill calls. */
const BIN_SCALE = 20
const BIN_COUNT = BIN_SCALE + 1

// =============================================================================
// Component
// =============================================================================

/**
 * Interactive canvas background with animated dot grid and floating particles.
 * The grid responds to mouse movement, creating a subtle distortion effect.
 * Automatically reduces complexity on lower-end / mobile devices.
 */
export function DreamyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef<MouseState>({ x: -1000, y: -1000, vx: 0, vy: 0 })
  const lastMouseRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef<Particle[]>([])
  const gridRef = useRef<Grid>({ points: [], cols: 0, rows: 0, spacing: 18 })
  const animationRef = useRef<number | null>(null)
  const lowEndRef = useRef(false)
  const frameCountRef = useRef(0)
  const isVisibleRef = useRef(true)
  const isDarkRef = useRef(true)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  // The animation loop reads size from a ref so a resize never tears it down.
  const dimensionsRef = useRef({ width: 0, height: 0 })

  // Indices of the points currently in motion, plus a live count.
  const activeRef = useRef<Int32Array>(new Int32Array(0))
  const activeCountRef = useRef(0)
  // Scratch buffers, sized once at init and refilled in place every frame.
  const distortedRef = useRef<Float32Array>(new Float32Array(0))
  const binDataRef = useRef<Float32Array[]>([])
  const binCountsRef = useRef<Int32Array>(new Int32Array(BIN_COUNT))
  // Resting dots are identical frame to frame, so they are rendered once into
  // an offscreen layer and blitted. Flagged stale by resize and theme changes.
  const staticStaleRef = useRef(true)

  // ---------------------------------------------------------------------------
  // Grid Initialization
  // ---------------------------------------------------------------------------

  const initializeGrid = useCallback((width: number, height: number) => {
    const points: GridPoint[] = []
    const lowEnd = lowEndRef.current
    // Larger spacing on low-end = fewer grid points
    const spacing = lowEnd ? 36 : 18

    // Column-major, matching the lattice index math in the animation loop.
    let cols = 0
    let rows = 0
    for (let x = 0; x < width + spacing; x += spacing) {
      cols++
      rows = 0
      for (let y = 0; y < height + spacing; y += spacing) {
        rows++
        points.push({
          baseX: x,
          baseY: y,
          x: x,
          y: y,
          vx: 0,
          vy: 0,
          asleep: true,
        })
      }
    }

    gridRef.current = { points, cols, rows, spacing }
    staticStaleRef.current = true
    activeRef.current = new Int32Array(points.length)
    activeCountRef.current = 0
    distortedRef.current = new Float32Array(points.length * 3)

    // Fewer ambient particles on low-end
    const ambientParticles: Particle[] = []
    const density = lowEnd ? 40000 : 15000
    const numAmbient = Math.floor((width * height) / density)

    for (let i = 0; i < numAmbient; i++) {
      ambientParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.1,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        life: Math.random() * 1000,
        maxLife: 1000,
        isAmbient: true,
      })
    }

    particlesRef.current = ambientParticles

    // Every ambient particle could land in the same bin, so size each for the
    // worst case. At a few hundred particles this is a handful of KB.
    const bins: Float32Array[] = []
    for (let i = 0; i < BIN_COUNT; i++) {
      bins.push(new Float32Array(Math.max(numAmbient, 1) * 3))
    }
    binDataRef.current = bins
  }, [])

  // ---------------------------------------------------------------------------
  // Resize Handler
  // ---------------------------------------------------------------------------

  useEffect(() => {
    lowEndRef.current = isLowEndDevice()

    const updateDimensions = () => {
      const next = { width: window.innerWidth, height: window.innerHeight }
      dimensionsRef.current = next
      setDimensions(next)
    }

    const handleVisibility = () => {
      isVisibleRef.current = !document.hidden
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      window.removeEventListener('resize', updateDimensions)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      initializeGrid(dimensions.width, dimensions.height)
    }
  }, [dimensions, initializeGrid])

  // ---------------------------------------------------------------------------
  // Theme Tracking
  // ---------------------------------------------------------------------------

  // Cached so the frame loop never touches the DOM to find out the theme.
  useEffect(() => {
    const root = document.documentElement
    const read = () => {
      const next = root.classList.contains('dark')
      if (next !== isDarkRef.current) staticStaleRef.current = true
      isDarkRef.current = next
    }

    read()
    const observer = new MutationObserver(read)
    observer.observe(root, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  // ---------------------------------------------------------------------------
  // Mouse Tracking
  // ---------------------------------------------------------------------------

  useEffect(() => {
    // Skip mouse tracking on touch devices
    if (lowEndRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastMouseRef.current.x
      const dy = e.clientY - lastMouseRef.current.y

      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        vx: dx * 0.5,
        vy: dy * 0.5,
      }

      lastMouseRef.current = { x: e.clientX, y: e.clientY }

      // Spawn flow particles based on mouse speed
      const speed = Math.sqrt(dx * dx + dy * dy)

      if (speed > 2) {
        const numParticles = Math.min(Math.floor(speed / 5), 3)

        for (let i = 0; i < numParticles; i++) {
          particlesRef.current.push({
            x: e.clientX + (Math.random() - 0.5) * 20,
            y: e.clientY + (Math.random() - 0.5) * 20,
            vx: -dx * 0.1 + (Math.random() - 0.5) * 2,
            vy: -dy * 0.1 + (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1,
            opacity: 0.6,
            life: 0,
            maxLife: 60 + Math.random() * 40,
            isAmbient: false,
          })
        }
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000, vx: 0, vy: 0 }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // ---------------------------------------------------------------------------
  // Animation Loop
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Offscreen layer holding every dot at its base position. Rebuilt only when
    // the grid or theme changes, then blitted once per frame — which replaces
    // thousands of per-frame arc calls with a single drawImage.
    const staticCanvas = document.createElement('canvas')
    const staticCtx = staticCanvas.getContext('2d')

    const rebuildStaticLayer = (width: number, height: number) => {
      if (!staticCtx) return
      staticCanvas.width = width
      staticCanvas.height = height

      const { points } = gridRef.current
      staticCtx.clearRect(0, 0, width, height)
      staticCtx.beginPath()
      for (let i = 0; i < points.length; i++) {
        const point = points[i]
        staticCtx.moveTo(point.baseX + DOT_RADIUS, point.baseY)
        staticCtx.arc(point.baseX, point.baseY, DOT_RADIUS, 0, TAU)
      }
      const channel = isDarkRef.current ? 255 : 0
      staticCtx.fillStyle = `rgba(${channel}, ${channel}, ${channel}, ${DOT_ALPHA})`
      staticCtx.fill()
    }

    const animate = () => {
      const { width, height } = dimensionsRef.current

      if (width === 0 || height === 0) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      // Pause entirely when tab is hidden
      if (!isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const lowEnd = lowEndRef.current

      // On low-end devices, skip every other frame (target ~30fps)
      frameCountRef.current++
      if (lowEnd && frameCountRef.current % 2 !== 0) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, width, height)

      const mouse = mouseRef.current
      const isDark = isDarkRef.current

      // Theme-aware colors
      const dotR = isDark ? 255 : 0
      const dotG = isDark ? 255 : 0
      const dotB = isDark ? 255 : 0
      const dotAlpha = DOT_ALPHA
      const dotAlphaDistorted = isDark ? 0.45 : 0.48
      const particleColor = isDark ? '255, 255, 255' : '0, 0, 0'

      const { points, cols, rows, spacing } = gridRef.current
      const gridLen = points.length
      const active = activeRef.current
      let activeCount = activeCountRef.current

      // --- Wake pass -------------------------------------------------------
      // Only points whose base falls inside the cursor's reach can be affected,
      // and on a regular lattice that range is pure arithmetic. This replaces a
      // full-grid distance test with a scan of ~80 candidates.
      if (gridLen > 0 && mouse.x > -DISTORTION_RADIUS && mouse.y > -DISTORTION_RADIUS) {
        const minXi = Math.max(0, Math.ceil((mouse.x - DISTORTION_RADIUS) / spacing))
        const maxXi = Math.min(cols - 1, Math.floor((mouse.x + DISTORTION_RADIUS) / spacing))
        const minYi = Math.max(0, Math.ceil((mouse.y - DISTORTION_RADIUS) / spacing))
        const maxYi = Math.min(rows - 1, Math.floor((mouse.y + DISTORTION_RADIUS) / spacing))

        for (let xi = minXi; xi <= maxXi; xi++) {
          const colBase = xi * rows
          for (let yi = minYi; yi <= maxYi; yi++) {
            const index = colBase + yi
            const point = points[index]
            const dx = point.baseX - mouse.x
            const dy = point.baseY - mouse.y
            const distSq = dx * dx + dy * dy

            if (distSq < DISTORTION_RADIUS * DISTORTION_RADIUS && distSq > 0) {
              const distance = Math.sqrt(distSq)
              const force = (1 - distance / DISTORTION_RADIUS) * DISTORTION_STRENGTH * 0.1
              // cos(atan2(dy,dx)) is dx/distance and sin(atan2(dy,dx)) is
              // dy/distance — same result, without the transcendentals.
              point.vx += (dx / distance) * force
              point.vy += (dy / distance) * force

              if (point.asleep) {
                point.asleep = false
                active[activeCount++] = index
              }
            }
          }
        }
      }

      // --- Physics pass ----------------------------------------------------
      // Backwards so a settled point can be swap-removed from the active list.
      for (let a = activeCount - 1; a >= 0; a--) {
        const point = points[active[a]]

        point.vx += (point.baseX - point.x) * SPRING_STRENGTH
        point.vy += (point.baseY - point.y) * SPRING_STRENGTH
        point.vx *= DAMPING
        point.vy *= DAMPING
        point.x += point.vx
        point.y += point.vy

        if (
          Math.abs(point.vx) < REST_EPSILON &&
          Math.abs(point.vy) < REST_EPSILON &&
          Math.abs(point.x - point.baseX) < REST_EPSILON &&
          Math.abs(point.y - point.baseY) < REST_EPSILON
        ) {
          point.x = point.baseX
          point.y = point.baseY
          point.vx = 0
          point.vy = 0
          point.asleep = true
          active[a] = active[activeCount - 1]
          activeCount--
        }
      }

      activeCountRef.current = activeCount

      // --- Draw pass -------------------------------------------------------
      // Resting dots come from the cached layer; only the handful of points
      // actually in motion are drawn live.
      if (
        staticStaleRef.current ||
        staticCanvas.width !== width ||
        staticCanvas.height !== height
      ) {
        rebuildStaticLayer(width, height)
        staticStaleRef.current = false
      }

      // Guard the blit: a zero-sized source would throw, and an exception here
      // would take down the whole rAF loop.
      if (staticCanvas.width > 0 && staticCanvas.height > 0) {
        ctx.drawImage(staticCanvas, 0, 0)
      }

      if (activeCount > 0) {
        // Erase the cached dot beneath every moving point before drawing any of
        // them, so one point's erase can never clip another's live dot.
        for (let a = 0; a < activeCount; a++) {
          const point = points[active[a]]
          ctx.clearRect(
            point.baseX - CLEAR_HALF,
            point.baseY - CLEAR_HALF,
            CLEAR_HALF * 2,
            CLEAR_HALF * 2
          )
        }

        const distorted = distortedRef.current
        let distortedCount = 0

        ctx.beginPath()

        for (let a = 0; a < activeCount; a++) {
          const point = points[active[a]]

          // Visual feedback based on distortion
          const offX = point.x - point.baseX
          const offY = point.y - point.baseY
          const distortion = offX * offX + offY * offY // skip sqrt, compare squared

          if (distortion > 1) {
            const o = distortedCount * 3
            distorted[o] = point.x
            distorted[o + 1] = point.y
            distorted[o + 2] = DOT_RADIUS + Math.sqrt(distortion) * 0.03
            distortedCount++
          } else {
            ctx.moveTo(point.x + DOT_RADIUS, point.y)
            ctx.arc(point.x, point.y, DOT_RADIUS, 0, TAU)
          }
        }

        // Fill normal dots in one call
        ctx.fillStyle = `rgba(${dotR}, ${dotG}, ${dotB}, ${dotAlpha})`
        ctx.fill()

        // Fill distorted dots
        if (distortedCount > 0) {
          ctx.beginPath()
          for (let i = 0; i < distortedCount; i++) {
            const o = i * 3
            const x = distorted[o]
            const y = distorted[o + 1]
            const size = distorted[o + 2]
            ctx.moveTo(x + size, y)
            ctx.arc(x, y, size, 0, TAU)
          }
          ctx.fillStyle = `rgba(${dotR}, ${dotG}, ${dotB}, ${dotAlphaDistorted})`
          ctx.fill()
        }
      }

      // --- Particles -------------------------------------------------------
      const particles = particlesRef.current
      const binData = binDataRef.current
      const binCounts = binCountsRef.current
      let writeIdx = 0

      binCounts.fill(0)

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i]

        if (particle.isAmbient) {
          particle.x += particle.vx
          particle.y += particle.vy

          if (particle.x < 0) particle.x = width
          if (particle.x > width) particle.x = 0
          if (particle.y < 0) particle.y = height
          if (particle.y > height) particle.y = 0

          particle.x += Math.sin(particle.life * 0.02) * 0.2
          particle.life++

          const pulse = Math.sin(particle.life * 0.03) * 0.1
          const opacity = particle.opacity + pulse

          // Bin by rounded opacity (nearest 0.05)
          let bin = Math.round(opacity * BIN_SCALE)
          if (bin < 0) bin = 0
          else if (bin > BIN_SCALE) bin = BIN_SCALE

          const buffer = binData[bin]
          const o = binCounts[bin] * 3
          if (o + 2 < buffer.length) {
            buffer[o] = particle.x
            buffer[o + 1] = particle.y
            buffer[o + 2] = particle.size
            binCounts[bin]++
          }

          particles[writeIdx++] = particle
        } else {
          particle.life++
          particle.x += particle.vx
          particle.y += particle.vy
          particle.vx *= 0.96
          particle.vy *= 0.96
          particle.opacity = (1 - particle.life / particle.maxLife) * 0.5

          if (particle.life >= particle.maxLife) continue

          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, TAU)
          ctx.fillStyle = `rgba(${particleColor}, ${particle.opacity})`
          ctx.fill()

          particles[writeIdx++] = particle
        }
      }
      particles.length = writeIdx

      // Draw batched ambient particles (one fill call per opacity bin)
      for (let bin = 0; bin < BIN_COUNT; bin++) {
        const count = binCounts[bin]
        if (count === 0) continue

        const buffer = binData[bin]
        ctx.beginPath()
        for (let i = 0; i < count; i++) {
          const o = i * 3
          const x = buffer[o]
          const y = buffer[o + 1]
          const size = buffer[o + 2]
          ctx.moveTo(x + size, y)
          ctx.arc(x, y, size, 0, TAU)
        }
        ctx.fillStyle = `rgba(${particleColor}, ${bin / BIN_SCALE})`
        ctx.fill()
      }

      // Draw subtle glow around cursor (skip on low-end)
      if (!lowEnd && mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 100)
        gradient.addColorStop(0, isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)')
        gradient.addColorStop(1, 'transparent')

        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 100, 0, TAU)
        ctx.fillStyle = gradient
        ctx.fill()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
}
