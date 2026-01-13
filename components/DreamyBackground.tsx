'use client'

import { useEffect, useRef, useCallback, useState } from 'react'

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

export function DreamyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0 })
  const lastMouseRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef<Particle[]>([])
  const gridRef = useRef<GridPoint[]>([])
  const animationRef = useRef<number | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Initialize grid and ambient particles
  const initializeGrid = useCallback((width: number, height: number) => {
    const spacing = 18
    const grid: GridPoint[] = []

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

    // Create ambient floating particles
    const ambientParticles: Particle[] = []
    const numAmbient = Math.floor((width * height) / 15000)

    for (let i = 0; i < numAmbient; i++) {
      ambientParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.1, // Slight upward drift
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        life: Math.random() * 1000,
        maxLife: 1000,
        isAmbient: true,
      })
    }
    particlesRef.current = ambientParticles
  }, [])

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Initialize grid when dimensions change
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      initializeGrid(dimensions.width, dimensions.height)
    }
  }, [dimensions, initializeGrid])

  // Mouse tracking
  useEffect(() => {
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

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      const { width, height } = dimensions
      if (width === 0 || height === 0) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, width, height)

      const mouse = mouseRef.current
      const distortionRadius = 80
      const distortionStrength = 12

      // Update and draw grid
      const isDark = document.documentElement.classList.contains('dark')
      const dotColor = isDark ? 'rgba(255, 255, 255, 0.20)' : 'rgba(0, 0, 0, 0.23)'
      const dotColorDistorted = isDark ? 'rgba(255, 255, 255, 0.28)' : 'rgba(0, 0, 0, 0.32)'

      gridRef.current.forEach(point => {
        // Calculate distance to mouse
        const dx = point.baseX - mouse.x
        const dy = point.baseY - mouse.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < distortionRadius && distance > 0) {
          // Push points away from mouse
          const force = (1 - distance / distortionRadius) * distortionStrength
          const angle = Math.atan2(dy, dx)

          point.vx += Math.cos(angle) * force * 0.1
          point.vy += Math.sin(angle) * force * 0.1
        }

        // Spring back to base position
        const springStrength = 0.05
        const damping = 0.85

        point.vx += (point.baseX - point.x) * springStrength
        point.vy += (point.baseY - point.y) * springStrength
        point.vx *= damping
        point.vy *= damping

        point.x += point.vx
        point.y += point.vy

        // Calculate distortion amount for visual effect
        const distortion = Math.sqrt(
          Math.pow(point.x - point.baseX, 2) +
          Math.pow(point.y - point.baseY, 2)
        )
        const color = distortion > 1 ? dotColorDistorted : dotColor
        const size = 0.6 + distortion * 0.03

        ctx.beginPath()
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
      })

      // Update and draw particles
      const particleColor = isDark ? '255, 255, 255' : '0, 0, 0'

      particlesRef.current = particlesRef.current.filter(particle => {
        if (particle.isAmbient) {
          // Ambient particles drift slowly
          particle.x += particle.vx
          particle.y += particle.vy

          // Wrap around screen
          if (particle.x < 0) particle.x = width
          if (particle.x > width) particle.x = 0
          if (particle.y < 0) particle.y = height
          if (particle.y > height) particle.y = 0

          // Subtle sine wave motion
          particle.x += Math.sin(particle.life * 0.02) * 0.2
          particle.life++

          // Pulse opacity
          const pulse = Math.sin(particle.life * 0.03) * 0.1
          const opacity = particle.opacity + pulse

          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${particleColor}, ${opacity})`
          ctx.fill()

          return true
        } else {
          // Flow particles from mouse
          particle.life++
          particle.x += particle.vx
          particle.y += particle.vy
          particle.vx *= 0.96
          particle.vy *= 0.96
          particle.opacity = (1 - particle.life / particle.maxLife) * 0.5

          if (particle.life >= particle.maxLife) return false

          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${particleColor}, ${particle.opacity})`
          ctx.fill()

          return true
        }
      })

      // Draw subtle glow around cursor
      if (mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 100
        )
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
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [dimensions])

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
