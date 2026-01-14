'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

// =============================================================================
// Types
// =============================================================================

interface Photo {
  id: number
  src: string
  caption: string
  aspectRatio: 'landscape' | 'portrait' | 'square'
  isIntro?: boolean
}

// =============================================================================
// Constants
// =============================================================================

const PHOTOS: Photo[] = [
  {
    id: 0,
    src: '/20250608_203302(1).jpg',
    caption: 'heya it is I shawn wei. scroll through the photos to get to know me :D',
    aspectRatio: 'landscape',
    isIntro: true,
  },
  {
    id: 1,
    src: '/20250816_153904.jpg',
    caption: 'My journey across the Camino de Santiago. A pilgrimage trek across West Spain to the city of Santiago De La Compostella.',
    aspectRatio: 'landscape',
  },
  {
    id: 2,
    src: '/PXL_20240810_125626559.NIGHT.jpg',
    caption: 'Joining the real life Tokyo Drift night life with an R-34 Skyline.',
    aspectRatio: 'portrait',
  },
  {
    id: 3,
    src: '/20250701_225308.jpg',
    caption: 'My love for photography with a long exposure portal shot. Straight out of Dr. Strange.',
    aspectRatio: 'portrait',
  },
  {
    id: 4,
    src: '/20260102_090622 (2).jpg',
    caption: 'Climbing and exploring the Andes. Rainbow Mountain, Peru. (Est. Elevation 5100 M)',
    aspectRatio: 'landscape',
  },
  {
    id: 5,
    src: '/20240730_100559.jpg',
    caption: 'Longtime interest in aviation. Taken in an Air Canada Boeing 777-300ER Cockpit.',
    aspectRatio: 'landscape',
  },
  {
    id: 6,
    src: '/drumming.JPG',
    caption: 'love music, I play the drums and usually like jamming out to Pop, Rock, and Jazz',
    aspectRatio: 'portrait',
  },
  {
    id: 7,
    src: '/deer.jpg',
    caption: 'animals are so cool and I love hanging out with them, they are docile beings that match your vibe',
    aspectRatio: 'landscape',
  },
]

const TITLE_TEXT = 'A Snapshot of Myself'

const PASTEL_RAINBOW = [
  { r: 255, g: 179, b: 186 },
  { r: 255, g: 223, b: 186 },
  { r: 255, g: 255, b: 186 },
  { r: 186, g: 255, b: 201 },
  { r: 186, g: 225, b: 255 },
  { r: 205, g: 186, b: 255 },
  { r: 255, g: 186, b: 239 },
]

// =============================================================================
// Sub-components
// =============================================================================

function GlowingTitle() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [letterGlows, setLetterGlows] = useState<number[]>(
    TITLE_TEXT.split('').map(() => 0)
  )

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const container = containerRef.current
    if (!container) return

    const letters = container.querySelectorAll('[data-letter]')
    const newGlows: number[] = []

    letters.forEach((letter) => {
      const rect = letter.getBoundingClientRect()
      const letterCenterX = rect.left + rect.width / 2
      const letterCenterY = rect.top + rect.height / 2

      const distance = Math.sqrt(
        Math.pow(e.clientX - letterCenterX, 2) + Math.pow(e.clientY - letterCenterY, 2)
      )

      const glow = Math.max(0, 1 - distance / 150)
      newGlows.push(glow)
    })

    setLetterGlows(newGlows)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setLetterGlows(TITLE_TEXT.split('').map(() => 0))
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  return (
    <div ref={containerRef} className="flex justify-center">
      <h2
        className="text-sm tracking-widest uppercase"
        style={{ letterSpacing: '0.2em' }}
      >
        {TITLE_TEXT.split('').map((letter, index) => {
          const glow = letterGlows[index] || 0
          return (
            <span
              key={index}
              data-letter
              className="transition-all duration-150"
              style={{
                color: `rgba(${100 + glow * 155}, ${100 + glow * 155}, ${100 + glow * 155}, ${0.5 + glow * 0.5})`,
                textShadow:
                  glow > 0.1 ? `0 0 ${glow * 20}px rgba(255,255,255,${glow * 0.5})` : 'none',
              }}
            >
              {letter}
            </span>
          )
        })}
      </h2>
    </div>
  )
}

function RainbowGlowingCaption({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [letterGlows, setLetterGlows] = useState<number[]>(text.split('').map(() => 0))

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const container = containerRef.current
      if (!container) return

      const letters = container.querySelectorAll('[data-rainbow-letter]')
      const newGlows: number[] = []

      letters.forEach((letter) => {
        const rect = letter.getBoundingClientRect()
        const letterCenterX = rect.left + rect.width / 2
        const letterCenterY = rect.top + rect.height / 2

        const distance = Math.sqrt(
          Math.pow(e.clientX - letterCenterX, 2) + Math.pow(e.clientY - letterCenterY, 2)
        )

        const glow = Math.max(0, 1 - distance / 120)
        newGlows.push(glow)
      })

      setLetterGlows(newGlows)
    },
    [text]
  )

  const handleMouseLeave = useCallback(() => {
    setLetterGlows(text.split('').map(() => 0))
  }, [text])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  return (
    <div ref={containerRef} className="text-center">
      <p className="text-sm leading-relaxed" style={{ fontStyle: 'italic' }}>
        {text.split('').map((letter, index) => {
          const glow = letterGlows[index] || 0
          const colorIndex = index % PASTEL_RAINBOW.length
          const color = PASTEL_RAINBOW[colorIndex]

          const r = Math.round(120 + glow * (color.r - 120))
          const g = Math.round(120 + glow * (color.g - 120))
          const b = Math.round(120 + glow * (color.b - 120))

          return (
            <span
              key={index}
              data-rainbow-letter
              className="transition-all duration-150"
              style={{
                color: `rgb(${r}, ${g}, ${b})`,
                textShadow:
                  glow > 0.1
                    ? `0 0 ${glow * 15}px rgba(${color.r}, ${color.g}, ${color.b}, ${glow * 0.6})`
                    : 'none',
              }}
            >
              {letter}
            </span>
          )
        })}
      </p>
    </div>
  )
}

interface InteractivePhotoProps {
  photo: Photo
  size: { width: number; height: number }
  focus: number
  onClick: () => void
}

function InteractivePhoto({ photo, size, focus, onClick }: InteractivePhotoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setMousePos({ x, y })
  }, [])

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setMousePos({ x: 0.5, y: 0.5 })
  }, [])

  // Calculate 3D transforms based on mouse position
  const tiltX = isHovered ? (mousePos.y - 0.5) * -15 : 0
  const tiltY = isHovered ? (mousePos.x - 0.5) * 15 : 0
  const frameOffsetX = isHovered ? (mousePos.x - 0.5) * -8 : 0
  const frameOffsetY = isHovered ? (mousePos.y - 0.5) * -8 : 0
  const imageOffsetX = isHovered ? (mousePos.x - 0.5) * 12 : 0
  const imageOffsetY = isHovered ? (mousePos.y - 0.5) * 12 : 0
  const spotlightX = mousePos.x * 100
  const spotlightY = mousePos.y * 100

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="cursor-pointer transition-transform duration-300 ease-out"
      style={{
        transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className="rounded-lg overflow-hidden transition-all duration-300 ease-out"
        style={{
          padding: 6,
          paddingBottom: 8,
          background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
          boxShadow:
            focus > 0.5
              ? `0 ${40 + tiltX * 2}px 80px rgba(0,0,0,0.25), 0 ${20 + tiltX}px 40px rgba(0,0,0,0.15)`
              : '0 15px 40px rgba(0,0,0,0.1)',
          border: '1px solid rgba(0,0,0,0.05)',
          transform: `translate(${frameOffsetX}px, ${frameOffsetY}px)`,
        }}
      >
        <div
          className="relative overflow-hidden rounded transition-transform duration-300 ease-out"
          style={{ transform: `translate(${imageOffsetX}px, ${imageOffsetY}px)` }}
        >
          <img
            src={photo.src}
            alt={photo.caption}
            className="object-cover rounded-sm"
            style={{ width: size.width, height: size.height }}
            draggable={false}
          />
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${spotlightX}% ${spotlightY}%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.1) 30%, transparent 60%)`,
              opacity: isHovered ? 1 : 0,
            }}
          />
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// Main Component
// =============================================================================

export function ScrollPhotoGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [focusValues, setFocusValues] = useState<number[]>(
    PHOTOS.map((_, i) => (i === 0 ? 1 : 0))
  )
  const [activeIndex, setActiveIndex] = useState(0)
  const [expandedPhoto, setExpandedPhoto] = useState<Photo | null>(null)

  // ---------------------------------------------------------------------------
  // Scroll Handler
  // ---------------------------------------------------------------------------

  const handleScroll = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const containerRect = container.getBoundingClientRect()
    const containerCenter = containerRect.top + containerRect.height / 2

    const newFocus: number[] = []
    let closestIndex = 0
    let closestDistance = Infinity

    const photoElements = container.querySelectorAll('[data-photo-item]')

    photoElements.forEach((el, index) => {
      const rect = el.getBoundingClientRect()
      const photoCenter = rect.top + rect.height / 2
      const distance = Math.abs(photoCenter - containerCenter)
      const maxDistance = containerRect.height * 0.5

      const rawFocus = Math.max(0, 1 - distance / maxDistance)
      const focus = rawFocus * rawFocus * (3 - 2 * rawFocus)

      newFocus.push(focus)

      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })

    setFocusValues(newFocus)
    setActiveIndex(closestIndex)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => container.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // ---------------------------------------------------------------------------
  // Photo Click Handlers
  // ---------------------------------------------------------------------------

  const handlePhotoClick = useCallback((photo: Photo) => {
    setExpandedPhoto(photo)
  }, [])

  const closeExpanded = useCallback(() => {
    setExpandedPhoto(null)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeExpanded()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closeExpanded])

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  const getPhotoSize = (aspectRatio: string) => {
    switch (aspectRatio) {
      case 'portrait':
        return { width: 260, height: 365 }
      case 'landscape':
        return { width: 360, height: 270 }
      default:
        return { width: 300, height: 300 }
    }
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <>
      <div className="h-full relative" style={{ perspective: '1200px' }}>
        {/* Header */}
        <div className="absolute top-8 left-0 right-0 z-10 pointer-events-none">
          <GlowingTitle />
        </div>

        {/* Scroll Container */}
        <div
          ref={containerRef}
          className="h-full w-full overflow-y-auto overflow-x-hidden scrollbar-hide"
          style={{ scrollSnapType: 'y mandatory' }}
        >
          <div style={{ height: '50vh' }} />

          {PHOTOS.map((photo, index) => {
            const focus = focusValues[index] || 0
            const size = getPhotoSize(photo.aspectRatio)

            const scale = 0.6 + focus * 0.4
            const opacity = 0.15 + focus * 0.85
            const rotateX = (1 - focus) * 70
            const translateY = (1 - focus) * 40
            const blur = (1 - focus) * 4

            const captionOpacity = Math.max(0, (focus - 0.7) * 3.33)
            const captionTranslateY = (1 - captionOpacity) * 20

            return (
              <div
                key={photo.id}
                data-photo-item
                className="flex flex-col items-center justify-center"
                style={{
                  scrollSnapAlign: 'center',
                  height: '100vh',
                  paddingTop: '10vh',
                  paddingBottom: '10vh',
                }}
              >
                <div
                  className="transition-all duration-700 ease-out"
                  style={{
                    transform: `
                      perspective(1200px)
                      rotateX(${rotateX}deg)
                      translateY(${translateY}px)
                      scale(${scale})
                    `,
                    opacity,
                    filter: `blur(${blur}px)`,
                    transformOrigin: 'center bottom',
                  }}
                >
                  <div className={`dreamy-float-${(index % 6) + 1}`}>
                    <InteractivePhoto
                      photo={photo}
                      size={size}
                      focus={focus}
                      onClick={() => handlePhotoClick(photo)}
                    />
                  </div>
                </div>

                <div
                  className="mt-8 text-center max-w-sm px-6 transition-all duration-700 ease-out"
                  style={{
                    opacity: captionOpacity,
                    transform: `translateY(${captionTranslateY}px)`,
                  }}
                >
                  {photo.isIntro ? (
                    <RainbowGlowingCaption text={photo.caption} />
                  ) : (
                    <p
                      className="text-sm text-text-muted leading-relaxed"
                      style={{ fontStyle: 'italic' }}
                    >
                      {photo.caption}
                    </p>
                  )}
                </div>
              </div>
            )
          })}

          <div style={{ height: '50vh' }} />
        </div>

        {/* Progress Indicator */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          {PHOTOS.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const container = containerRef.current
                const items = container?.querySelectorAll('[data-photo-item]')
                items?.[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }}
              className="transition-all duration-500 rounded-full hover:scale-125"
              style={{
                width: activeIndex === index ? 10 : 6,
                height: activeIndex === index ? 10 : 6,
                backgroundColor: 'var(--text)',
                opacity: activeIndex === index ? 0.9 : 0.2,
              }}
            />
          ))}
        </div>

        {/* Scroll Hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500"
          style={{ opacity: activeIndex === 0 ? 0.5 : 0 }}
        >
          <span className="text-xs text-text-muted tracking-wide">scroll</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-text-muted animate-bounce"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>

      {/* Expanded Photo Overlay */}
      {expandedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={closeExpanded}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'fadeScale 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            <div
              className="rounded-xl overflow-hidden"
              style={{
                padding: 8,
                paddingBottom: 10,
                background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
                boxShadow: '0 50px 100px rgba(0,0,0,0.5)',
              }}
            >
              <img
                src={expandedPhoto.src}
                alt={expandedPhoto.caption}
                className="object-cover rounded-lg"
                style={{
                  width: expandedPhoto.aspectRatio === 'portrait' ? 340 : 480,
                  height: expandedPhoto.aspectRatio === 'portrait' ? 480 : 360,
                }}
                draggable={false}
              />
            </div>
            <p
              className="text-center mt-6 text-white/80 text-sm max-w-md mx-auto leading-relaxed"
              style={{ fontStyle: 'italic' }}
            >
              {expandedPhoto.caption}
            </p>
            <button
              onClick={closeExpanded}
              className="absolute -top-4 -right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors backdrop-blur-sm"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  )
}
