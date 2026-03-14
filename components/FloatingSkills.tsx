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
  vx: number
  vy: number
  baseSpeed: number
  size: number
  opacity: number
  rotation: number
}

// Subset of FloatingIcon that React uses for rendering (stable between physics ticks)
interface RenderedIcon {
  id: number
  skillIndex: number
  size: number
  opacity: number
}

// Physics constants
const REPULSION_RADIUS = 150
const REPULSION_STRENGTH = 0.5
const DAMPING = 0.92
const BASE_FLOAT_SPEED = 0.08
const LEFT_BOUNDARY = 250
const MAX_ICONS = 7

export function FloatingSkills() {
  const containerRef = useRef<HTMLDivElement>(null)
  // Physics state lives in ref — mutated in-place, never triggers React
  const iconsDataRef = useRef<FloatingIcon[]>([])
  // React only re-renders when the set of visible icons changes (add / remove)
  const [renderedIcons, setRenderedIcons] = useState<RenderedIcon[]>([])
  const elementRefsMap = useRef<Map<number, HTMLDivElement>>(new Map())
  const mousePosRef = useRef({ x: -1000, y: -1000 })
  const animationRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)
  const counterRef = useRef(0)
  const [isNarrow, setIsNarrow] = useState(false)

  // Track scroll progress for fade out
  const { scrollY } = useScroll()
  const containerOpacity = useTransform(scrollY, [0, 300], [1, 0])

  // Detect narrow screens where icons aren't visible anyway
  useEffect(() => {
    const check = () => setIsNarrow(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Generate a new floating icon (ensuring no duplicate skills)
  const createIcon = useCallback((startFromBottom = true, usedSkillIndexes: Set<number>): FloatingIcon | null => {
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200

    const availableIndexes = SKILLS.map((_, i) => i).filter(i => !usedSkillIndexes.has(i))
    if (availableIndexes.length === 0) return null

    const skillIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)]
    const spawnWidth = viewportWidth - LEFT_BOUNDARY - 60
    const x = LEFT_BOUNDARY + Math.random() * spawnWidth

    return {
      id: counterRef.current++,
      skillIndex,
      x,
      y: startFromBottom
        ? viewportHeight + 50 + Math.random() * 100
        : Math.random() * viewportHeight,
      vx: 0,
      vy: 0,
      baseSpeed: BASE_FLOAT_SPEED + Math.random() * 0.03,
      size: 36 + Math.random() * 20,
      opacity: 0.5 + Math.random() * 0.2,
      rotation: Math.random() * 30 - 15,
    }
  }, [])

  // Initialize icons on mount
  useEffect(() => {
    if (isNarrow) return

    const initialIcons: FloatingIcon[] = []
    const usedIndexes = new Set<number>()

    for (let i = 0; i < MAX_ICONS; i++) {
      const newIcon = createIcon(false, usedIndexes)
      if (newIcon) {
        initialIcons.push(newIcon)
        usedIndexes.add(newIcon.skillIndex)
      }
    }
    iconsDataRef.current = initialIcons
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time mount initialization, same pattern as ThemeProvider/ScrollPhotoGallery
    setRenderedIcons(initialIcons.map(({ id, skillIndex, size, opacity }) => ({ id, skillIndex, size, opacity })))
  }, [createIcon, isNarrow])

  // Track mouse position via ref (no re-renders)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseLeave = () => {
      mousePosRef.current = { x: -1000, y: -1000 }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Physics animation loop — updates DOM directly, skips React reconciliation
  useEffect(() => {
    if (isNarrow) return

    // Pause when tab is hidden
    let isVisible = true
    const handleVisibility = () => { isVisible = !document.hidden }
    document.addEventListener('visibilitychange', handleVisibility)

    const animate = (currentTime: number) => {
      if (!isVisible) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime
      }

      const deltaTime = Math.min((currentTime - lastTimeRef.current) / 16, 3)
      lastTimeRef.current = currentTime

      const mousePos = mousePosRef.current
      const icons = iconsDataRef.current
      const viewportWidth = window.innerWidth
      let needsReactSync = false

      // Update physics in-place (no object allocation)
      for (let i = icons.length - 1; i >= 0; i--) {
        const icon = icons[i]

        // Cursor repulsion
        const dx = icon.x + icon.size / 2 - mousePos.x
        const dy = icon.y + icon.size / 2 - mousePos.y
        const distSq = dx * dx + dy * dy

        if (distSq < REPULSION_RADIUS * REPULSION_RADIUS && distSq > 0) {
          const distance = Math.sqrt(distSq)
          const force = (REPULSION_RADIUS - distance) / REPULSION_RADIUS * REPULSION_STRENGTH
          const angle = Math.atan2(dy, dx)
          icon.vx += Math.cos(angle) * force * deltaTime
          icon.vy += Math.sin(angle) * force * deltaTime
        }

        icon.vy -= icon.baseSpeed * deltaTime
        icon.vx *= DAMPING
        icon.vy *= DAMPING
        icon.x += icon.vx * deltaTime
        icon.y += icon.vy * deltaTime

        if (icon.x < LEFT_BOUNDARY) {
          icon.x = LEFT_BOUNDARY
          icon.vx = Math.abs(icon.vx) * 0.3
        } else if (icon.x > viewportWidth - icon.size - 20) {
          icon.x = viewportWidth - icon.size - 20
          icon.vx = -Math.abs(icon.vx) * 0.3
        }

        icon.rotation += icon.vx * 0.15

        // Update DOM directly — bypass React
        const el = elementRefsMap.current.get(icon.id)
        if (el) {
          el.style.transform = `translate3d(${icon.x}px, ${icon.y}px, 0) rotate(${icon.rotation}deg)`
        }

        // Remove if floated off top
        if (icon.y < -100) {
          icons.splice(i, 1)
          needsReactSync = true
        }
      }

      // Add new icons if needed
      if (icons.length < MAX_ICONS) {
        const usedSkillIndexes = new Set(icons.map(ic => ic.skillIndex))
        while (icons.length < MAX_ICONS) {
          const newIcon = createIcon(true, usedSkillIndexes)
          if (newIcon) {
            icons.push(newIcon)
            usedSkillIndexes.add(newIcon.skillIndex)
            needsReactSync = true
          } else {
            break
          }
        }
      }

      // Only trigger React re-render when icon set changes (~once per 30s)
      if (needsReactSync) {
        setRenderedIcons(icons.map(({ id, skillIndex, size, opacity }) => ({ id, skillIndex, size, opacity })))
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [createIcon, isNarrow])

  // Don't render anything on narrow screens
  if (isNarrow) return null

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      style={{ opacity: containerOpacity }}
    >
      {renderedIcons.map((icon) => {
        const { Icon } = SKILLS[icon.skillIndex]
        return (
          <div
            key={icon.id}
            ref={(el) => {
              if (el) elementRefsMap.current.set(icon.id, el)
              else elementRefsMap.current.delete(icon.id)
            }}
            className="absolute"
            style={{
              left: 0,
              top: 0,
              width: icon.size,
              height: icon.size,
              opacity: icon.opacity,
              willChange: 'transform',
            }}
          >
            <Icon className="w-full h-full drop-shadow-md" />
          </div>
        )
      })}
    </motion.div>
  )
}
