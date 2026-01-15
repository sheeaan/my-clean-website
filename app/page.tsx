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
  ResumeIcon,
} from '@/components/icons'

// =============================================================================
// Constants
// =============================================================================

const NAV_LINKS = [
  { href: '/', label: 'about' },
  { href: '/projects', label: 'projects' },
] as const

const SOCIAL_LINKS = [
  { href: 'https://github.com/sheeaan', label: 'GitHub', icon: GithubIcon },
  { href: 'https://www.linkedin.com/in/shawn-wei007/', label: 'LinkedIn', icon: LinkedinIcon },
  { href: 'mailto:shawn.wei@uwaterloo.ca', label: 'Email', icon: EmailIcon },
  { href: '/resume.pdf', label: 'Resume', icon: ResumeIcon },
] as const

// =============================================================================
// Sub-components
// =============================================================================

interface HighlightLinkProps {
  href: string
  children: React.ReactNode
  icon?: React.ReactNode
  external?: boolean
}

function HighlightLink({ href, children, icon, external = true }: HighlightLinkProps) {
  const content = (
    <>
      {icon && (
        <span
          className="inline-flex items-center mr-1 align-middle"
          style={{ marginBottom: '2px' }}
        >
          {icon}
        </span>
      )}
      {children}
    </>
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="highlight-sweep"
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className="highlight-sweep">
      {content}
    </Link>
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
      {/* Mobile Navigation - Sticky Top Bar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-text/10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4 text-sm">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={
                    'transition-colors duration-150 ' +
                    (isActive ? 'text-text font-medium' : 'text-text-muted hover:text-text')
                  }
                >
                  {label}
                </Link>
              )
            })}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-text-muted">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <SocialIcon key={label} href={href} label={label}>
                  <Icon />
                </SocialIcon>
              ))}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Desktop Navigation - Fixed */}
      <nav className="hidden md:flex flex-col items-end w-[140px] fixed left-8 top-12 text-sm z-50">
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
      <div className="hidden md:flex flex-col items-end gap-3 text-text-muted fixed left-8 bottom-12 w-[140px] z-50">
        {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
          <SocialIcon key={label} href={href} label={label}>
            <Icon />
          </SocialIcon>
        ))}
      </div>

      {/* Hero Section */}
      <section className="min-h-screen pt-14 md:pt-0">
        <div className="flex">
          {/* Spacer for nav on desktop */}
          <div className="hidden md:block w-[180px] flex-shrink-0" />

          {/* Main Content */}
          <div className="flex-1 flex flex-col md:flex-row">
            {/* Text Content */}
            <div className="w-full md:w-[50%] pt-8 md:pt-12 pb-8 md:pb-24 flex justify-center md:justify-start">
              <div className="w-full max-w-lg px-6 md:px-0 md:pl-8 text-[15px]">
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
                        <HighlightLink
                          href="https://www.ibo.org/"
                          icon={<LogoImage src="/ib-logo.png" alt="IB" />}
                        >
                          IB diploma
                        </HighlightLink>{' '}
                        graduate
                      </span>
                    </p>
                    <p className="bullet-diamond">
                      <span>
                        Bachelor of Honours{' '}
                        <HighlightLink href="https://cs.uwaterloo.ca" icon={<CodeIcon />}>
                          Computer Science
                        </HighlightLink>
                      </span>
                    </p>
                  </div>
                </Reveal>

                <Reveal>
                  <div className="mb-9">
                    <p className="bullet-diamond section-label mb-3">
                      <span>from thought to product:</span>
                    </p>
                    <div className="space-y-2.5">
                      <p className="bullet-tree">
                        <span>
                          <HighlightLink href="/projects#flight-telemetry" icon={<AirplaneIcon />} external={false}>
                            flight telemetry pipeline
                          </HighlightLink>
                          {' '}- real-time ADS-B signal processing with 40% reduced latency
                        </span>
                      </p>
                      <p className="bullet-tree">
                        <span>
                          <HighlightLink href="/projects#autonomous-nav" icon={<Team9569Logo />} external={false}>
                            autonomous navigation system
                          </HighlightLink>
                          {' '}- 95% reliable robotics with sensor fusion & PID control
                        </span>
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal>
                  <div className="mb-9">
                    <p className="bullet-diamond section-label mb-3">
                      <span>previously:</span>
                    </p>
                    <div className="space-y-2.5">
                      <p className="bullet-tree"><span>MMHS CS Club Co-President</span></p>
                      <p className="bullet-tree"><span>FRC 9569 Robotics Programming Lead</span></p>
                    </div>
                  </div>
                </Reveal>

                <Reveal>
                  <div className="mb-10">
                    <p className="bullet-diamond section-label mb-3">
                      <span>exploring:</span>
                    </p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                      <p className="bullet-tree"><span>AI & machine learning</span></p>
                      <p className="bullet-tree"><span>cybersecurity</span></p>
                      <p className="bullet-tree"><span>full-stack development</span></p>
                      <p className="bullet-tree"><span>the world :)</span></p>
                    </div>
                  </div>
                </Reveal>

                <Reveal>
                  <p className="bullet-diamond">
                    <span>
                      <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline glow-link"
                        style={{ textUnderlineOffset: '3px' }}
                      >
                        resume.pdf
                      </a>
                    </span>
                  </p>
                </Reveal>
              </div>
            </div>

            {/* Photo Gallery */}
            <div className="w-full md:w-[50%] h-[70vh] md:h-screen md:sticky md:top-0 overflow-hidden">
              <ScrollPhotoGallery />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
