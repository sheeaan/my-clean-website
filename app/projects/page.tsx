'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ThemeToggle } from '@/components/ThemeToggle'
import {
  GithubIcon,
  LinkedinIcon,
  EmailIcon,
  ResumeIcon,
  PythonIcon,
  SqlIcon,
  FlaskIcon,
  JavaIcon,
  OpenCVIcon,
  GearIcon,
} from '@/components/icons'

// =============================================================================
// Constants
// =============================================================================

const NAV_LINKS = [
  { href: '/', label: 'about' },
  { href: '/projects', label: 'projects' },
  { href: '/experience', label: 'experience' },
  { href: '/photos', label: 'photos' },
] as const

const SOCIAL_LINKS = [
  { href: 'https://github.com/sheeaan', label: 'GitHub', icon: GithubIcon },
  { href: 'https://www.linkedin.com/in/shawn-wei007/', label: 'LinkedIn', icon: LinkedinIcon },
  { href: 'mailto:shawn.wei@uwaterloo.ca', label: 'Email', icon: EmailIcon },
  { href: '/resume.pdf', label: 'Resume', icon: ResumeIcon },
] as const

// =============================================================================
// Types
// =============================================================================

interface TechTag {
  name: string
  icon: React.ComponentType<{ className?: string }>
}

interface Project {
  id: string
  title: string
  subtitle: string
  date: string
  description: string[]
  tags: TechTag[]
  stats: { label: string; value: string }[]
  image?: string
}

const PROJECTS: Project[] = [
  {
    id: 'flight-telemetry',
    title: 'Flight Telemetry Pipeline',
    subtitle: 'Real-Time ADS-B Analytics',
    date: 'Sept 2025',
    description: [
      'Engineered a high-throughput data ingestion pipeline to process real-time ADS-B signals, ensuring data integrity while transforming unstructured JSON telemetry into relational schemas.',
      'Optimized query performance and reduced retrieval latency by 40% for 50+ concurrent streams by implementing efficient indexing strategies and local caching.',
      'Applied statistical analysis using NumPy to identify telemetry trends, providing actionable insights into aircraft performance metrics.',
    ],
    tags: [
      { name: 'Python', icon: PythonIcon },
      { name: 'SQL', icon: SqlIcon },
      { name: 'Flask', icon: FlaskIcon },
    ],
    stats: [
      { label: 'Latency Reduction', value: '40%' },
      { label: 'Concurrent Streams', value: '50+' },
    ],
    image: '/projects/flight-telemetry.jpg',
  },
  {
    id: 'autonomous-nav',
    title: 'Autonomous Navigation',
    subtitle: 'Robotics & Sensor Fusion',
    date: 'Apr 2024',
    description: [
      'Architected fault-tolerant autonomous logic achieving 95% execution reliability via sensor fusion (Vision + IMU) and custom state machines.',
      'Implemented PID control loops to reduce positional drift by 20%, utilizing OpenCV to detect AprilTags for real-time target acquisition and path planning.',
    ],
    tags: [
      { name: 'Java', icon: JavaIcon },
      { name: 'OpenCV', icon: OpenCVIcon },
      { name: 'PID', icon: GearIcon },
    ],
    stats: [
      { label: 'Reliability', value: '95%' },
      { label: 'Drift Reduction', value: '20%' },
    ],
    image: '/projects/autonomous-nav.jpeg',
  },
]

// =============================================================================
// Sub-components
// =============================================================================

interface SocialIconProps {
  href: string
  label: string
  children: React.ReactNode
}

function SocialIcon({ href, label, children }: SocialIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="hover:text-text transition-colors duration-150"
    >
      {children}
    </a>
  )
}

// =============================================================================
// Transition Animations
// =============================================================================

interface TransitionIconProps {
  progress: any // MotionValue
  index: number
  totalProjects: number
}

function PlaneTransition({ progress, index, totalProjects }: TransitionIconProps) {
  const segmentSize = 1 / totalProjects
  const transitionStart = index * segmentSize
  const transitionEnd = transitionStart + segmentSize * 0.4 // Longer duration

  // Phase timings for runway takeoff
  const taxiEnd = transitionStart + segmentSize * 0.15      // Horizontal acceleration
  const liftoffPoint = transitionStart + segmentSize * 0.2  // Wheels up
  const climbEnd = transitionEnd                            // Full climb

  // Plane appears, taxis, lifts off, climbs, then fades
  const opacity = useTransform(
    progress,
    [transitionStart, transitionStart + 0.01, transitionEnd - 0.03, transitionEnd],
    [0, 1, 1, 0]
  )

  // Horizontal movement - fast taxi then continues during climb
  const x = useTransform(
    progress,
    [transitionStart, taxiEnd, liftoffPoint, climbEnd],
    [-200, -50, 50, 250]
  )

  // Vertical - stays on ground during taxi, then climbs
  const y = useTransform(
    progress,
    [transitionStart, taxiEnd, liftoffPoint, climbEnd],
    [120, 120, 80, -180]
  )

  // Rotation - level during taxi, nose up at liftoff, steeper climb
  const rotate = useTransform(
    progress,
    [transitionStart, taxiEnd, liftoffPoint, liftoffPoint + 0.05, climbEnd],
    [0, 0, -15, -30, -35]
  )

  // Scale - grows as it gets closer, then shrinks as it flies away
  const scale = useTransform(
    progress,
    [transitionStart, taxiEnd, liftoffPoint + 0.05, climbEnd],
    [0.6, 1, 1.2, 0.7]
  )

  // Trail grows during acceleration
  const trailScale = useTransform(
    progress,
    [transitionStart, taxiEnd, climbEnd],
    [0, 1, 1.5]
  )

  const trailOpacity = useTransform(
    progress,
    [transitionStart, taxiEnd, liftoffPoint, climbEnd],
    [0, 0.6, 0.4, 0]
  )

  // Combine base rotation (90deg to point right) with climb rotation
  const totalRotate = useTransform(rotate, (r) => r + 90)

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
      style={{ opacity }}
    >
      {/* Plane and trail container */}
      <motion.div
        style={{ y, x, scale }}
        className="relative"
      >
        {/* Rotating plane wrapper */}
        <motion.div style={{ rotate: totalRotate }}>
          <svg
            width="70"
            height="70"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-text"
          >
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </svg>
        </motion.div>

        {/* Engine trail - positioned in screen space (always horizontal, behind plane) */}
        <motion.div
          className="absolute top-1/2 right-[60%] -translate-y-1/2 w-48 h-[2px] rounded-full"
          style={{
            scaleX: trailScale,
            opacity: trailOpacity,
            originX: 1,
            background: 'linear-gradient(to left, var(--text) 0%, var(--text-muted) 30%, transparent 100%)',
          }}
        />

        {/* Secondary trail - softer glow */}
        <motion.div
          className="absolute top-1/2 right-[55%] -translate-y-1/2 w-32 h-1.5 rounded-full blur-sm"
          style={{
            scaleX: trailScale,
            opacity: useTransform(trailOpacity, [0, 0.6], [0, 0.2]),
            originX: 1,
            background: 'linear-gradient(to left, var(--text-muted) 0%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* Runway line */}
      <motion.div
        className="absolute bottom-[35%] left-0 right-0 h-[2px] bg-text-muted/20"
        style={{
          opacity: useTransform(progress, [transitionStart, liftoffPoint, liftoffPoint + 0.05], [0.5, 0.5, 0]),
        }}
      />
    </motion.div>
  )
}

function AprilTagTransition({ progress, index, totalProjects }: TransitionIconProps) {
  const segmentSize = 1 / totalProjects
  // For non-first projects, transition starts slightly before the segment (during previous project's fadeout)
  const transitionStart = index * segmentSize - segmentSize * 0.15
  const transitionEnd = index * segmentSize + segmentSize * 0.25 // Longer duration

  const opacity = useTransform(
    progress,
    [transitionStart, transitionStart + 0.02, transitionEnd - 0.03, transitionEnd],
    [0, 1, 1, 0]
  )

  const scale = useTransform(
    progress,
    [transitionStart, transitionStart + 0.1, transitionEnd - 0.05, transitionEnd],
    [0.5, 1.1, 1, 0.9]
  )

  // Scanning animation progress
  const scanProgress = useTransform(
    progress,
    [transitionStart, transitionEnd],
    [0, 1]
  )

  // Pulsing glow effect
  const glowOpacity = useTransform(
    scanProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [0, 0.5, 0.3, 0.6, 0]
  )

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
      style={{ opacity }}
    >
      <motion.div style={{ scale }} className="relative">
        {/* Glow effect behind tag */}
        <motion.div
          className="absolute -inset-8 rounded-2xl"
          style={{
            opacity: glowOpacity,
            background: 'radial-gradient(circle, rgba(74, 222, 128, 0.3) 0%, transparent 70%)',
          }}
        />

        {/* AprilTag square */}
        <div className="relative w-32 h-32">
          {/* Outer frame - animates in */}
          <motion.div
            className="absolute inset-0 border-4 border-text rounded-lg"
            style={{
              opacity: useTransform(scanProgress, [0, 0.15], [0, 1]),
              scale: useTransform(scanProgress, [0, 0.15], [1.2, 1]),
            }}
          />

          {/* Inner pattern - simplified AprilTag look */}
          <div className="absolute inset-4 grid grid-cols-4 grid-rows-4 gap-1.5">
            {[1,0,1,0,0,1,0,1,1,0,1,0,0,1,0,1].map((filled, i) => (
              <motion.div
                key={i}
                className={`rounded-sm ${filled ? 'bg-text' : 'bg-text/10'}`}
                style={{
                  opacity: useTransform(
                    scanProgress,
                    [0.1 + i * 0.03, 0.1 + i * 0.03 + 0.08],
                    [0, 1]
                  ),
                  scale: useTransform(
                    scanProgress,
                    [0.1 + i * 0.03, 0.1 + i * 0.03 + 0.08],
                    [0.5, 1]
                  ),
                }}
              />
            ))}
          </div>

          {/* Scanning corners - larger and more visible */}
          <motion.div
            className="absolute -top-3 -left-3 w-8 h-8 border-t-[3px] border-l-[3px] border-green-400 rounded-tl-sm"
            style={{
              x: useTransform(scanProgress, [0, 0.4, 0.6], [-10, 0, 12]),
              y: useTransform(scanProgress, [0, 0.4, 0.6], [-10, 0, 12]),
              opacity: useTransform(scanProgress, [0, 0.1, 0.5, 0.7], [0, 1, 1, 0]),
            }}
          />
          <motion.div
            className="absolute -top-3 -right-3 w-8 h-8 border-t-[3px] border-r-[3px] border-green-400 rounded-tr-sm"
            style={{
              x: useTransform(scanProgress, [0, 0.4, 0.6], [10, 0, -12]),
              y: useTransform(scanProgress, [0, 0.4, 0.6], [-10, 0, 12]),
              opacity: useTransform(scanProgress, [0, 0.1, 0.5, 0.7], [0, 1, 1, 0]),
            }}
          />
          <motion.div
            className="absolute -bottom-3 -left-3 w-8 h-8 border-b-[3px] border-l-[3px] border-green-400 rounded-bl-sm"
            style={{
              x: useTransform(scanProgress, [0, 0.4, 0.6], [-10, 0, 12]),
              y: useTransform(scanProgress, [0, 0.4, 0.6], [10, 0, -12]),
              opacity: useTransform(scanProgress, [0, 0.1, 0.5, 0.7], [0, 1, 1, 0]),
            }}
          />
          <motion.div
            className="absolute -bottom-3 -right-3 w-8 h-8 border-b-[3px] border-r-[3px] border-green-400 rounded-br-sm"
            style={{
              x: useTransform(scanProgress, [0, 0.4, 0.6], [10, 0, -12]),
              y: useTransform(scanProgress, [0, 0.4, 0.6], [10, 0, -12]),
              opacity: useTransform(scanProgress, [0, 0.1, 0.5, 0.7], [0, 1, 1, 0]),
            }}
          />

          {/* Scan line - sweeps multiple times */}
          <motion.div
            className="absolute left-0 right-0 h-1 bg-green-400 rounded-full"
            style={{
              top: useTransform(scanProgress, [0.1, 0.5, 0.55, 0.85], ['0%', '100%', '0%', '100%']),
              opacity: useTransform(scanProgress, [0.05, 0.15, 0.45, 0.5, 0.55, 0.8, 0.85], [0, 1, 1, 0, 1, 1, 0]),
              boxShadow: '0 0 15px rgba(74, 222, 128, 0.8), 0 0 30px rgba(74, 222, 128, 0.4)',
            }}
          />

          {/* "DETECTED" text that appears at the end */}
          <motion.div
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-green-400 text-xs font-mono tracking-widest"
            style={{
              opacity: useTransform(scanProgress, [0.7, 0.8, 0.95, 1], [0, 1, 1, 0]),
              y: useTransform(scanProgress, [0.7, 0.8], [10, 0]),
            }}
          >
            DETECTED
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Map project IDs to their transition animations
const TRANSITION_ICONS: Record<string, React.ComponentType<TransitionIconProps>> = {
  'flight-telemetry': PlaneTransition,
  'autonomous-nav': AprilTagTransition,
}

// =============================================================================
// Project Card Component with Apple-style animations
// =============================================================================

interface ProjectCardProps {
  project: Project
  index: number
  progress: any // MotionValue
  totalProjects: number
}

function ProjectCard({ project, index, progress, totalProjects }: ProjectCardProps) {
  // Each card occupies a segment of the total scroll
  const segmentSize = 1 / totalProjects
  const start = index * segmentSize
  const end = (index + 1) * segmentSize
  const isFirst = index === 0

  // Transition zone - leave room for transition icon at the start
  const fadeOutStart = end - segmentSize * 0.25  // Start fading out at 75% of segment
  const fadeOutEnd = end - segmentSize * 0.08    // Fully out by 92% of segment
  // First project fades in AFTER the plane animation (starts at 35% of segment)
  // Other projects fade in after their transition icons (starts at 20% of segment)
  const fadeInStart = start + segmentSize * (isFirst ? 0.35 : 0.2)
  const fadeInEnd = start + segmentSize * (isFirst ? 0.5 : 0.35)

  // Card scale - all cards now fade in after their transition icon
  const cardScale = useTransform(
    progress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0.88, 1, 1, 0.92]
  )

  // Card opacity
  const cardOpacity = useTransform(
    progress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0, 1, 1, 0]
  )

  // Card Y position
  const cardY = useTransform(
    progress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [60, 0, 0, -50]
  )

  // Image animations - leads slightly
  const imageScale = useTransform(
    progress,
    [fadeInStart, fadeInEnd - 0.02, fadeOutStart - 0.02, fadeOutEnd],
    [0.85, 1, 1, 0.95]
  )

  const imageOpacity = useTransform(
    progress,
    [fadeInStart, fadeInEnd - 0.02, fadeOutStart - 0.02, fadeOutEnd - 0.02],
    [0, 1, 1, 0]
  )

  const imageY = useTransform(
    progress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [40, 0, 0, -30]
  )

  // Text animations - staggered after image
  const textOpacity = useTransform(
    progress,
    [fadeInStart + 0.02, fadeInEnd + 0.02, fadeOutStart + 0.02, fadeOutEnd],
    [0, 1, 1, 0]
  )

  const textY = useTransform(
    progress,
    [fadeInStart + 0.02, fadeInEnd + 0.02, fadeOutStart, fadeOutEnd],
    [50, 0, 0, -40]
  )

  // Tags - staggered last
  const tagsOpacity = useTransform(
    progress,
    [fadeInStart + 0.04, fadeInEnd + 0.04, fadeOutStart + 0.04, fadeOutEnd - 0.02],
    [0, 1, 1, 0]
  )

  const tagsY = useTransform(
    progress,
    [fadeInStart + 0.04, fadeInEnd + 0.04, fadeOutStart + 0.02, fadeOutEnd],
    [25, 0, 0, -20]
  )

  // Z-index based on how "active" the card is
  const zIndex = totalProjects - index

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        scale: cardScale,
        opacity: cardOpacity,
        y: cardY,
        zIndex,
      }}
    >
      <div className="w-full max-w-5xl mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Image card - animates first */}
          <motion.div
            className={`w-full lg:w-1/2 flex justify-center ${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}
            style={{
              scale: imageScale,
              opacity: imageOpacity,
              y: imageY,
            }}
          >
            <div className="relative w-full max-w-xl aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative w-full h-full rounded-2xl border border-border/50 overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-contain bg-black/95"
                  />
                ) : (
                  <div className="absolute inset-0 bg-highlight-bg flex items-center justify-center">
                    <span className="text-4xl opacity-30">
                      {project.id === 'flight-telemetry' ? '✈' : '🤖'}
                    </span>
                  </div>
                )}

                {/* Stats overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/90 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex justify-between">
                  {project.stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-lg font-semibold text-white">{stat.value}</div>
                      <div className="text-xs text-white/60">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text content - animates after image */}
          <div className={`w-full lg:w-1/2 ${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
            <motion.div
              className="space-y-5"
              style={{
                opacity: textOpacity,
                y: textY,
              }}
            >
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-text-muted mb-2">
                  {project.date}
                </p>
                <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-2">
                  {project.title}
                </h3>
                <p className="text-lg text-text-muted">{project.subtitle}</p>
              </div>

              <ul className="space-y-3 text-text-muted text-[15px] leading-relaxed">
                {project.description.map((point, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-text-muted/40 mt-1.5 flex-shrink-0 text-[10px]">●</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Tags - animate last */}
            <motion.div
              className="flex flex-wrap gap-2 mt-6"
              style={{
                opacity: tagsOpacity,
                y: tagsY,
              }}
            >
              {project.tags.map((tag) => (
                <span
                  key={tag.name}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border border-border bg-highlight-bg/50 text-text-muted backdrop-blur-sm"
                >
                  <tag.icon />
                  {tag.name}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// =============================================================================
// Main Component
// =============================================================================

export default function Projects() {
  const pathname = usePathname()
  const containerRef = useRef<HTMLDivElement>(null)

  // Track scroll progress through the entire stack
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <div className="min-h-screen">
      {/* Desktop Navigation - Fixed */}
      <nav className="hidden lg:flex flex-col items-end w-[140px] fixed left-8 top-12 text-sm z-50">
        {NAV_LINKS.map(({ href, label }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={
                'py-2 transition-colors duration-150 ' +
                (isActive ? 'text-text' : 'text-text-muted hover:text-text')
              }
            >
              {label}
            </Link>
          )
        })}

        <div className="mt-8">
          <ThemeToggle />
        </div>
      </nav>

      {/* Social Icons - Fixed at bottom, aligned with nav */}
      <div className="hidden lg:flex flex-col items-end gap-3 text-text-muted fixed left-8 bottom-12 w-[140px] z-50">
        {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
          <SocialIcon key={label} href={href} label={label}>
            <Icon />
          </SocialIcon>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-50">
        <div className="flex flex-col gap-3">
          {PROJECTS.map((_, i) => {
            const segmentSize = 1 / PROJECTS.length
            const start = i * segmentSize
            const mid = start + segmentSize * 0.5
            return (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-text"
                style={{
                  scale: useTransform(
                    scrollYProgress,
                    [start, mid, start + segmentSize],
                    [0.6, 1.3, 0.6]
                  ),
                  opacity: useTransform(
                    scrollYProgress,
                    [start, mid, start + segmentSize],
                    [0.2, 1, 0.2]
                  ),
                }}
              />
            )
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-[180px]">
        {/* Header */}
        <div className="h-[15vh] flex items-end justify-center pb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center"
          >
            <h2 className="text-lg font-medium tracking-tight mb-1">Projects</h2>
            <p className="text-text-muted text-[11px] tracking-wide">Scroll to explore</p>
          </motion.div>
        </div>

        {/* Stacked Cards Container */}
        <div
          ref={containerRef}
          className="relative"
          style={{ height: `${(PROJECTS.length + 1) * 200}vh` }}
        >
          {/* Sticky viewport for cards */}
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            {/* Transition icons */}
            {PROJECTS.map((project, index) => {
              const TransitionIcon = TRANSITION_ICONS[project.id]
              return TransitionIcon ? (
                <TransitionIcon
                  key={`transition-${project.id}`}
                  progress={scrollYProgress}
                  index={index}
                  totalProjects={PROJECTS.length}
                />
              ) : null
            })}

            {/* Project cards */}
            {PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                progress={scrollYProgress}
                totalProjects={PROJECTS.length}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
