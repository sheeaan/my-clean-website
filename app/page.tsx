'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Reveal } from '@/components/Reveal'
import { ScrollPhotoGallery } from '@/components/ScrollPhotoGallery'
import { ThemeToggle } from '@/components/ThemeToggle'

const navLinks = [
  { href: '/', label: 'about' },
  { href: '/projects', label: 'projects' },
  { href: '/experience', label: 'experience' },
  { href: '/photos', label: 'photos' },
]

export default function Home() {
  const pathname = usePathname()

  return (
    <div className="min-h-screen">
      <div className="flex">
        <nav className="hidden lg:flex flex-col items-end w-[140px] fixed left-8 top-12 text-sm">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={'py-2 transition-colors duration-150 ' + (isActive ? 'text-text' : 'text-text-muted hover:text-text')}
              >
                {label}
              </Link>
            )
          })}
          <div className="mt-8 flex flex-col items-end gap-4">
            <ThemeToggle />
            <div className="flex flex-col items-end gap-3 text-text-muted">
              <SocialIcon href="https://github.com/sheeaan" label="GitHub"><GithubIcon /></SocialIcon>
              <SocialIcon href="https://www.linkedin.com/in/shawn-wei007/" label="LinkedIn"><LinkedinIcon /></SocialIcon>
              <SocialIcon href="mailto:shawn.wei@uwaterloo.ca" label="Email"><EmailIcon /></SocialIcon>
            </div>
          </div>
        </nav>

        <div className="flex-1 lg:ml-[180px] flex flex-col lg:flex-row">
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
                  <HighlightLink href="https://uwaterloo.ca" icon={<UWaterlooLogo />}>UWaterloo</HighlightLink>
                  . interested in AI, cybersecurity, and building things with new tech.
                </p>
              </Reveal>

              <Reveal>
                <div className="space-y-2.5 mb-9">
                  <p className="bullet-diamond">
                    <span>1st year{' '}<HighlightLink href="https://cs.uwaterloo.ca" icon={<CodeIcon />}>computer science</HighlightLink></span>
                  </p>
                  <p className="bullet-diamond"><span><HighlightLink href="https://www.ibo.org/" icon={<IBLogo />}>IB diploma</HighlightLink> graduate</span></p>
                </div>
              </Reveal>

              <Reveal>
                <div className="mb-9">
                  <p className="bullet-diamond section-label mb-3"><span>what i've been building:</span></p>
                  <div className="space-y-2.5">
                    <p className="bullet-tree">
                      <span><HighlightLink href="#" icon={<AirplaneIcon />}>flight telemetry pipeline</HighlightLink>{' '}- real-time ADS-B signal processing with 40% reduced latency</span>
                    </p>
                    <p className="bullet-tree">
                      <span><HighlightLink href="#" icon={<Team9569Logo />}>autonomous navigation system</HighlightLink>{' '}- 95% reliable robotics with sensor fusion & PID control</span>
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="mb-10">
                  <p className="bullet-diamond section-label mb-3"><span>exploring:</span></p>
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

          {/* Photo Gallery - works on all screen sizes */}
          <div className="w-full lg:w-[50%] h-[70vh] lg:h-screen lg:sticky lg:top-0 overflow-hidden">
            <ScrollPhotoGallery />
          </div>
        </div>
      </div>
    </div>
  )
}

function HighlightLink({ href, children, icon }: { href: string; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="highlight-sweep">
      {icon && <span className="inline-flex items-center mr-1 align-middle" style={{ marginBottom: '2px' }}>{icon}</span>}
      {children}
    </a>
  )
}

function UWaterlooLogo() {
  return (
    <img
      src="/uwaterloo-logo.svg"
      alt="UWaterloo"
      className="inline-block w-[18px] h-[18px] rounded-full object-cover"
      style={{ verticalAlign: 'middle' }}
    />
  )
}

function IBLogo() {
  return (
    <img
      src="/ib-logo.png"
      alt="IB"
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

function CodeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block" style={{ verticalAlign: 'middle' }}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function AirplaneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="inline-block" style={{ verticalAlign: 'middle' }}>
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
    </svg>
  )
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
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

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  )
}
