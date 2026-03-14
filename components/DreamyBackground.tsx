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
  const gridRef = useRef<GridPoint[]>([])
  const animationRef = useRef<number | null>(null)
  const lowEndRef = useRef(false)
  const frameCountRef = useRef(0)
  const isVisibleRef = useRef(true)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // ---------------------------------------------------------------------------
  // Grid Initialization
  // ---------------------------------------------------------------------------

  const initializeGrid = useCallback((width: number, height: number) => {
    const grid: GridPoint[] = []
    const lowEnd = lowEndRef.current
    // Larger spacing on low-end = fewer grid points
    const spacing = lowEnd ? 36 : 18

    for (let x = 0; x < width + spacing; x += spacing) {
      for (let y = 0; y < height + spacing; y += spacing) {
        grid.push({
          baseX: x,
          baseY: y,
          x: x,
          y: y,
          vx: 0,
          vy: 0,
        })
      }
    }

    gridRef.current = grid

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
  }, [])

  // ---------------------------------------------------------------------------
  // Resize Handler
  // ---------------------------------------------------------------------------

  useEffect(() => {
    lowEndRef.current = isLowEndDevice()

    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
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

    const lowEnd = lowEndRef.current

    const animate = () => {
      const { width, height } = dimensions

      if (width === 0 || height === 0) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      // Pause entirely when tab is hidden
      if (!isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      // On low-end devices, skip every other frame (target ~30fps)
      frameCountRef.current++
      if (lowEnd && frameCountRef.current % 2 !== 0) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, width, height)

      const mouse = mouseRef.current
      const isDark = document.documentElement.classList.contains('dark')

      // Theme-aware colors
      const dotR = isDark ? 255 : 0
      const dotG = isDark ? 255 : 0
      const dotB = isDark ? 255 : 0
      const dotAlpha = 0.35
      const dotAlphaDistorted = isDark ? 0.45 : 0.48
      const particleColor = isDark ? '255, 255, 255' : '0, 0, 0'

      // Batch draw: collect normal dots and distorted dots separately
      const grid = gridRef.current
      const gridLen = grid.length

      // Single beginPath for normal dots, single for distorted
      ctx.beginPath()
      const distortedPath: { x: number; y: number; size: number }[] = []

      for (let i = 0; i < gridLen; i++) {
        const point = grid[i]
        const dx = point.baseX - mouse.x
        const dy = point.baseY - mouse.y
        const distSq = dx * dx + dy * dy

        // Apply mouse distortion (skip sqrt when outside radius)
        if (distSq < DISTORTION_RADIUS * DISTORTION_RADIUS && distSq > 0) {
          const distance = Math.sqrt(distSq)
          const force = (1 - distance / DISTORTION_RADIUS) * DISTORTION_STRENGTH
          const angle = Math.atan2(dy, dx)
          point.vx += Math.cos(angle) * force * 0.1
          point.vy += Math.sin(angle) * force * 0.1
        }

        // Spring physics
        point.vx += (point.baseX - point.x) * SPRING_STRENGTH
        point.vy += (point.baseY - point.y) * SPRING_STRENGTH
        point.vx *= DAMPING
        point.vy *= DAMPING
        point.x += point.vx
        point.y += point.vy

        // Visual feedback based on distortion
        const offX = point.x - point.baseX
        const offY = point.y - point.baseY
        const distortion = offX * offX + offY * offY // skip sqrt, compare squared

        if (distortion > 1) {
          const size = 0.6 + Math.sqrt(distortion) * 0.03
          distortedPath.push({ x: point.x, y: point.y, size })
        } else {
          ctx.moveTo(point.x + 0.6, point.y)
          ctx.arc(point.x, point.y, 0.6, 0, Math.PI * 2)
        }
      }

      // Fill normal dots in one call
      ctx.fillStyle = `rgba(${dotR}, ${dotG}, ${dotB}, ${dotAlpha})`
      ctx.fill()

      // Fill distorted dots
      if (distortedPath.length > 0) {
        ctx.beginPath()
        for (let i = 0; i < distortedPath.length; i++) {
          const d = distortedPath[i]
          ctx.moveTo(d.x + d.size, d.y)
          ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2)
        }
        ctx.fillStyle = `rgba(${dotR}, ${dotG}, ${dotB}, ${dotAlphaDistorted})`
        ctx.fill()
      }

      // Update and draw particles
      const particles = particlesRef.current
      let writeIdx = 0

      // Batch ambient particles by rounded opacity to reduce draw calls
      // Key: opacity rounded to 0.05 -> array of {x, y, size}
      const ambientBins = new Map<number, { x: number; y: number; size: number }[]>()

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

          // Bin by rounded opacity
          const binKey = Math.round(opacity * 20) / 20 // round to nearest 0.05
          let bin = ambientBins.get(binKey)
          if (!bin) {
            bin = []
            ambientBins.set(binKey, bin)
          }
          bin.push({ x: particle.x, y: particle.y, size: particle.size })

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
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${particleColor}, ${particle.opacity})`
          ctx.fill()

          particles[writeIdx++] = particle
        }
      }
      particles.length = writeIdx

      // Draw batched ambient particles (one fill call per opacity bin)
      ambientBins.forEach((bin, opacity) => {
        ctx.beginPath()
        for (let i = 0; i < bin.length; i++) {
          const p = bin[i]
          ctx.moveTo(p.x + p.size, p.y)
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        }
        ctx.fillStyle = `rgba(${particleColor}, ${opacity})`
        ctx.fill()
      })

      // Draw subtle glow around cursor (skip on low-end)
      if (!lowEnd && mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 100)
        gradient.addColorStop(0, isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)')
        gradient.addColorStop(1, 'transparent')

        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2)
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
  }, [dimensions])

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
