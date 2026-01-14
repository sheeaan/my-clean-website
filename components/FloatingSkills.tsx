'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  PythonIcon,
  JavaIcon,
  CIcon,
  CppIcon,
  JavaScriptIcon,
  HtmlCssIcon,
  SqlIcon,
  BashIcon,
  ReactIcon,
  NextJsIcon,
  TailwindIcon,
  NodeJsIcon,
  FastApiIcon,
  DjangoIcon,
  LinuxIcon,
  DockerIcon,
  AzureIcon,
  GitIcon,
  PostgreSqlIcon,
  CiCdIcon,
  JiraIcon,
  MsOfficeIcon,
  TypeScriptIcon,
} from '@/components/icons'

// All skill icons with their components
const SKILLS = [
  { name: 'Python', Icon: PythonIcon },
  { name: 'Java', Icon: JavaIcon },
  { name: 'C', Icon: CIcon },
  { name: 'C++', Icon: CppIcon },
  { name: 'JavaScript', Icon: JavaScriptIcon },
  { name: 'HTML/CSS', Icon: HtmlCssIcon },
  { name: 'SQL', Icon: SqlIcon },
  { name: 'Bash', Icon: BashIcon },
  { name: 'React', Icon: ReactIcon },
  { name: 'Next.js', Icon: NextJsIcon },
  { name: 'Tailwind', Icon: TailwindIcon },
  { name: 'Node.js', Icon: NodeJsIcon },
  { name: 'FastAPI', Icon: FastApiIcon },
  { name: 'Django', Icon: DjangoIcon },
  { name: 'Linux/Unix', Icon: LinuxIcon },
  { name: 'Docker', Icon: DockerIcon },
  { name: 'Azure', Icon: AzureIcon },
  { name: 'Git', Icon: GitIcon },
  { name: 'PostgreSQL', Icon: PostgreSqlIcon },
  { name: 'CI/CD', Icon: CiCdIcon },
  { name: 'JIRA', Icon: JiraIcon },
  { name: 'MS Office', Icon: MsOfficeIcon },
  { name: 'TypeScript', Icon: TypeScriptIcon },
]

interface FloatingIcon {
  id: number
  skillIndex: number
  x: number
  y: number
  vx: number // velocity x
  vy: number // velocity y
  baseSpeed: number // base upward speed
  size: number
  opacity: number
  rotation: number
}

// Physics constants
const REPULSION_RADIUS = 150 // pixels - how far the cursor affects icons
const REPULSION_STRENGTH = 0.5 // how strongly icons are pushed (gentler)
const DAMPING = 0.92 // velocity damping for smooth movement
const BASE_FLOAT_SPEED = 0.08 // base upward speed (much slower, elegant)
const LEFT_BOUNDARY = 250 // pixels - icons only appear to the right of navbar
const MAX_ICONS = 7 // fewer icons for cleaner look

export function FloatingSkills() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [icons, setIcons] = useState<FloatingIcon[]>([])
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const animationRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)
  const counterRef = useRef(0)

  // Track scroll progress for fade out
  const { scrollY } = useScroll()
  const containerOpacity = useTransform(scrollY, [0, 300], [1, 0])

  // Generate a new floating icon (ensuring no duplicate skills)
  const createIcon = useCallback((startFromBottom = true, usedSkillIndexes: Set<number>): FloatingIcon | null => {
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200

    // Find available skill indexes (not currently in use)
    const availableIndexes = SKILLS.map((_, i) => i).filter(i => !usedSkillIndexes.has(i))
    if (availableIndexes.length === 0) return null

    // Pick a random available skill
    const skillIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)]

    // Calculate spawn area (right of navbar)
    const spawnWidth = viewportWidth - LEFT_BOUNDARY - 60 // Leave margin on right too
    const x = LEFT_BOUNDARY + Math.random() * spawnWidth

    return {
      id: counterRef.current++,
      skillIndex,
      x,
      y: startFromBottom
        ? viewportHeight + 50 + Math.random() * 100 // Start below viewport
        : Math.random() * viewportHeight, // Random position for initial icons
      vx: 0,
      vy: 0,
      baseSpeed: BASE_FLOAT_SPEED + Math.random() * 0.03, // Very slight speed variation
      size: 36 + Math.random() * 20, // 36-56px - larger icons
      opacity: 0.5 + Math.random() * 0.2, // 50-70% opacity
      rotation: Math.random() * 30 - 15, // Slight initial tilt
    }
  }, [])

  // Initialize icons on mount
  useEffect(() => {
    const initialIcons: FloatingIcon[] = []
    const usedIndexes = new Set<number>()

    // Create initial icons scattered across the viewport (no duplicates)
    for (let i = 0; i < MAX_ICONS; i++) {
      const newIcon = createIcon(false, usedIndexes)
      if (newIcon) {
        initialIcons.push(newIcon)
        usedIndexes.add(newIcon.skillIndex)
      }
    }
    setIcons(initialIcons)
  }, [createIcon])

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    const handleMouseLeave = () => {
      setMousePos({ x: -1000, y: -1000 }) // Move cursor "off screen"
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Physics animation loop
  useEffect(() => {
    const animate = (currentTime: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime
      }

      const deltaTime = Math.min((currentTime - lastTimeRef.current) / 16, 3) // Cap delta to prevent jumps
      lastTimeRef.current = currentTime

      setIcons((prevIcons) => {
        const viewportWidth = window.innerWidth

        let updatedIcons = prevIcons.map((icon) => {
          let { x, y, vx, vy, baseSpeed, rotation } = icon

          // Apply cursor repulsion
          const dx = x + icon.size / 2 - mousePos.x
          const dy = y + icon.size / 2 - mousePos.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < REPULSION_RADIUS && distance > 0) {
            const force = (REPULSION_RADIUS - distance) / REPULSION_RADIUS * REPULSION_STRENGTH
            const angle = Math.atan2(dy, dx)
            vx += Math.cos(angle) * force * deltaTime
            vy += Math.sin(angle) * force * deltaTime
          }

          // Apply base upward float
          vy -= baseSpeed * deltaTime

          // Apply damping
          vx *= DAMPING
          vy *= DAMPING

          // Update position
          x += vx * deltaTime
          y += vy * deltaTime

          // Keep icons within horizontal bounds (right of navbar, with gentle bounce)
          if (x < LEFT_BOUNDARY) {
            x = LEFT_BOUNDARY
            vx = Math.abs(vx) * 0.3
          } else if (x > viewportWidth - icon.size - 20) {
            x = viewportWidth - icon.size - 20
            vx = -Math.abs(vx) * 0.3
          }

          // Very gentle rotation based on horizontal velocity
          rotation += vx * 0.15

          return { ...icon, x, y, vx, vy, rotation }
        })

        // Remove icons that have floated off the top
        updatedIcons = updatedIcons.filter((icon) => icon.y > -100)

        // Get currently used skill indexes
        const usedSkillIndexes = new Set(updatedIcons.map(icon => icon.skillIndex))

        // Add new icons from bottom to maintain count (no duplicates)
        while (updatedIcons.length < MAX_ICONS) {
          const newIcon = createIcon(true, usedSkillIndexes)
          if (newIcon) {
            updatedIcons.push(newIcon)
            usedSkillIndexes.add(newIcon.skillIndex)
          } else {
            break // No more unique skills available
          }
        }

        return updatedIcons
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePos, createIcon])

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      style={{ opacity: containerOpacity }}
    >
      {icons.map((icon) => {
        const { Icon } = SKILLS[icon.skillIndex]
        return (
          <div
            key={icon.id}
            className="absolute transition-none"
            style={{
              left: icon.x,
              top: icon.y,
              width: icon.size,
              height: icon.size,
              opacity: icon.opacity,
              transform: `rotate(${icon.rotation}deg)`,
              willChange: 'transform, left, top',
            }}
          >
            <Icon className="w-full h-full drop-shadow-md" />
          </div>
        )
      })}
    </motion.div>
  )
}
