'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Reveal } from '@/components/Reveal'
import { ScrollPhotoGallery } from '@/components/ScrollPhotoGallery'
import { ThemeToggle } from '@/components/ThemeToggle'
import {
  CodeIcon,
  AirplaneIcon,
  GithubIcon,
  LinkedinIcon,
  EmailIcon,
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
] as const

// =============================================================================
// Sub-components
// =============================================================================

interface HighlightLinkProps {
  href: string
  children: React.ReactNode
  icon?: React.ReactNode
}

function HighlightLink({ href, children, icon }: HighlightLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="highlight-sweep"
    >
      {icon && (
        <span
          className="inline-flex items-center mr-1 align-middle"
          style={{ marginBottom: '2px' }}
        >
          {icon}
        </span>
      )}
      {children}
    </a>
  )
}

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

interface LogoImageProps {
  src: string
  alt: string
}

function LogoImage({ src, alt }: LogoImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className="inline-block w-[18px] h-[18px] rounded-full object-cover"
      style={{ verticalAlign: 'middle' }}
    />
  )
}

function Team9569Logo() {
  return (
    <img
      src="/team9569-logo.svg"
      alt="Team 9569"
      className="inline-block w-[18px] h-[18px] object-contain"
      style={{ verticalAlign: 'middle' }}
    />
  )
}

// =============================================================================
// Main Component
// =============================================================================

export default function Home() {
  const pathname = usePathname()

  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-col items-end w-[140px] fixed left-8 top-12 text-sm">
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

          <div className="mt-8 flex flex-col items-end gap-4">
            <ThemeToggle />
            <div className="flex flex-col items-end gap-3 text-text-muted">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <SocialIcon key={label} href={href} label={label}>
                  <Icon />
                </SocialIcon>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 lg:ml-[180px] flex flex-col lg:flex-row">
          {/* Text Content */}
          <div className="w-full lg:w-[50%] pt-8 md:pt-12 pb-24 flex justify-center lg:justify-start">
            <div className="w-full max-w-lg px-6 md:px-10 lg:px-0 lg:pl-8 text-[15px]">
              <Reveal>
                <h1 className="text-[2.25rem] md:text-[2.75rem] font-medium tracking-tight mb-6">
                  <span className="rainbow-underline">Shawn Wei</span>
                </h1>
              </Reveal>

              <Reveal>
                <p className="text-text-muted mb-9 leading-relaxed">
                  CS student at{' '}
                  <HighlightLink
                    href="https://uwaterloo.ca"
                    icon={<LogoImage src="/uwaterloo-logo.svg" alt="UWaterloo" />}
                  >
                    UWaterloo
                  </HighlightLink>
                  . interested in AI, cybersecurity, and building things with new tech.
                </p>
              </Reveal>

              <Reveal>
                <div className="space-y-2.5 mb-9">
                  <p className="bullet-diamond">
                    <span>
                      1st year{' '}
                      <HighlightLink href="https://cs.uwaterloo.ca" icon={<CodeIcon />}>
                        computer science
                      </HighlightLink>
                    </span>
                  </p>
                  <p className="bullet-diamond">
                    <span>
                      <HighlightLink
                        href="https://www.ibo.org/"
                        icon={<LogoImage src="/ib-logo.png" alt="IB" />}
                      >
                        IB diploma
                      </HighlightLink>{' '}
                      graduate
                    </span>
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="mb-9">
                  <p className="bullet-diamond section-label mb-3">
                    <span>what i've been building:</span>
                  </p>
                  <div className="space-y-2.5">
                    <p className="bullet-tree">
                      <span>
                        <HighlightLink href="#" icon={<AirplaneIcon />}>
                          flight telemetry pipeline
                        </HighlightLink>
                        {' '}- real-time ADS-B signal processing with 40% reduced latency
                      </span>
                    </p>
                    <p className="bullet-tree">
                      <span>
                        <HighlightLink href="#" icon={<Team9569Logo />}>
                          autonomous navigation system
                        </HighlightLink>
                        {' '}- 95% reliable robotics with sensor fusion & PID control
                      </span>
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="mb-10">
                  <p className="bullet-diamond section-label mb-3">
                    <span>exploring:</span>
                  </p>
                  <div className="space-y-2.5">
                    <p className="bullet-tree"><span>AI & machine learning</span></p>
                    <p className="bullet-tree"><span>cybersecurity</span></p>
                    <p className="bullet-tree"><span>full-stack development</span></p>
                    <p className="bullet-tree"><span>the world :)</span></p>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <p className="text-text-muted text-sm italic">more to come</p>
              </Reveal>
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="w-full lg:w-[50%] h-[70vh] lg:h-screen lg:sticky lg:top-0 overflow-hidden">
            <ScrollPhotoGallery />
          </div>
        </div>
      </div>
    </div>
  )
}
