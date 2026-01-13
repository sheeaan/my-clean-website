'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Matter from 'matter-js'

interface PhotoConfig {
  id: number
  width: number
  height: number
  anchorX: number
  baseStringLength: number
  imageUrl: string
  caption: string
}

const FRAME_PADDING = 12

// 5 photos with better spacing - distributed across width with varied vertical positions
const photos: PhotoConfig[] = [
  { id: 1, width: 180, height: 135, anchorX: 8, baseStringLength: 60, imageUrl: '/20250816_153904.jpg', caption: 'My journey across the Camino de Santiago. A pilgrimage trek across West Spain to the city of Santiago De La Compostella.' },
  { id: 2, width: 140, height: 250, anchorX: 28, baseStringLength: 280, imageUrl: '/PXL_20240810_125626559.NIGHT.jpg', caption: 'Joining the real life Tokyo Drift night life with an R-34 Skyline.' },
  { id: 3, width: 145, height: 195, anchorX: 50, baseStringLength: 120, imageUrl: '/20250701_225308.jpg', caption: 'My love for photography with a long exposure portal shot. Straight out of Dr. Strange.' },
  { id: 4, width: 180, height: 135, anchorX: 72, baseStringLength: 360, imageUrl: '/20260102_090622 (2).jpg', caption: 'Climbing and exploring the Andes. Rainbow Mountain, Peru. (Est. Elevation 5100 M)' },
  { id: 5, width: 160, height: 120, anchorX: 90, baseStringLength: 180, imageUrl: '/20240730_100559.jpg', caption: 'Longtime interest in aviation. Taken in an Air Canada Boeing 777-300ER Cockpit.' },
]

interface PhysicsBody {
  body: Matter.Body
  constraint: Matter.Constraint
  config: PhotoConfig
  anchorPoint: { x: number; y: number }
  baseAnchorY: number
}

export function ScatteredPhotoGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<Matter.Engine | null>(null)
  const bodiesRef = useRef<PhysicsBody[]>([])
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null)
  const animationFrameRef = useRef<number>(0)
  const lastScrollY = useRef(0)
  const clickStartPos = useRef<{ x: number; y: number } | null>(null)
  const photoRefs = useRef<Map<number, HTMLDivElement>>(new Map())
  const positionsRef = useRef<Map<number, { x: number; y: number; angle: number }>>(new Map())
  const scaleRef = useRef(1)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [expandedPhoto, setExpandedPhoto] = useState<PhotoConfig | null>(null)
  const [scale, setScale] = useState(1)
  const [expandedPos, setExpandedPos] = useState<{ x: number; y: number } | null>(null)

  const handlePhotoMouseDown = useCallback((e: React.MouseEvent) => {
    clickStartPos.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handlePhotoClick = useCallback((e: React.MouseEvent, photo: PhotoConfig) => {
    // Check if this was a drag (mouse moved more than 8 pixels)
    if (clickStartPos.current) {
      const dx = e.clientX - clickStartPos.current.x
      const dy = e.clientY - clickStartPos.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance > 8) {
        clickStartPos.current = null
        return
      }
    }
    clickStartPos.current = null
    const pos = positionsRef.current.get(photo.id)
    setExpandedPhoto(photo)
    setExpandedPos(pos ? { x: pos.x, y: pos.y } : null)
  }, [])

  const closeExpanded = useCallback(() => {
    setExpandedPhoto(null)
    setExpandedPos(null)
  }, [])

  const drawStrings = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = container.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const currentScale = scaleRef.current
    const scaledFramePadding = FRAME_PADDING * currentScale
    const frameHeight = scaledFramePadding * 2

    bodiesRef.current.forEach(({ body, config, anchorPoint }) => {
      const scaledHeight = config.height * currentScale
      const totalHeight = scaledHeight + frameHeight
      const attachPoint = {
        x: body.position.x + Math.sin(body.angle) * (-totalHeight / 2),
        y: body.position.y - Math.cos(body.angle) * (totalHeight / 2)
      }

      ctx.beginPath()
      ctx.moveTo(anchorPoint.x, anchorPoint.y)

      const midX = (anchorPoint.x + attachPoint.x) / 2
      const midY = (anchorPoint.y + attachPoint.y) / 2 + 20
      ctx.quadraticCurveTo(midX, midY, attachPoint.x, attachPoint.y)

      ctx.strokeStyle = 'rgba(100, 100, 100, 0.5)'
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(anchorPoint.x, anchorPoint.y, 3, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(70, 70, 70, 0.9)'
      ctx.fill()

      ctx.beginPath()
      ctx.arc(attachPoint.x, attachPoint.y, 4, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(50, 50, 50, 0.9)'
      ctx.fill()
      ctx.beginPath()
      ctx.arc(attachPoint.x, attachPoint.y, 2, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(180, 180, 180, 0.9)'
      ctx.fill()
    })
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollY.current
      lastScrollY.current = currentScrollY

      if (engineRef.current && bodiesRef.current.length > 0) {
        bodiesRef.current.forEach(({ body, constraint, baseAnchorY }) => {
          constraint.pointA.y = baseAnchorY + currentScrollY * 0.3
          const force = delta * 0.00015
          Matter.Body.applyForce(body, body.position, { x: force, y: 0 })
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    // Calculate scale based on container width (base design is for ~700px width on 1440px screens)
    const baseWidth = 700
    const calculatedScale = Math.min(1, Math.max(0.55, width / baseWidth))
    scaleRef.current = calculatedScale
    setScale(calculatedScale)

    // Lower gravity for more floaty feel
    const engine = Matter.Engine.create({ gravity: { x: 0, y: 0.4 } })
    engineRef.current = engine

    const scaledFramePadding = FRAME_PADDING * calculatedScale
    const frameHeight = scaledFramePadding * 2
    const frameWidth = scaledFramePadding * 2

    // Anchor at very top
    const baseAnchorY = 8

    const physicsBodies: PhysicsBody[] = photos.map((photo) => {
      const anchorX = (photo.anchorX / 100) * width
      const scaledWidth = photo.width * calculatedScale
      const scaledHeight = photo.height * calculatedScale
      const scaledStringLength = photo.baseStringLength * calculatedScale
      const totalWidth = scaledWidth + frameWidth
      const totalHeight = scaledHeight + frameHeight
      const bodyX = anchorX
      const bodyY = baseAnchorY + scaledStringLength + totalHeight / 2

      const body = Matter.Bodies.rectangle(bodyX, bodyY, totalWidth, totalHeight, {
        restitution: 0.4,
        friction: 0.05,
        frictionAir: 0.008,
        density: 0.0008,
        label: 'photo-' + photo.id,
        chamfer: { radius: 4 * calculatedScale },
        collisionFilter: { group: -1 }
      })

      // Much lower stiffness for elastic/bouncy feel
      const constraint = Matter.Constraint.create({
        pointA: { x: anchorX, y: baseAnchorY },
        bodyB: body,
        pointB: { x: 0, y: -totalHeight / 2 },
        length: scaledStringLength,
        stiffness: 0.0006,
        damping: 0.02,
      })

      Matter.Composite.add(engine.world, [body, constraint])
      return { body, constraint, config: photo, anchorPoint: { x: anchorX, y: baseAnchorY }, baseAnchorY }
    })

    bodiesRef.current = physicsBodies

    const wallThickness = 100
    const wallPadding = 20 // Keep photos slightly inside the container
    const walls = [
      // Left wall
      Matter.Bodies.rectangle(-wallThickness / 2 + wallPadding, height / 2, wallThickness, height * 2, { isStatic: true, restitution: 0.6, friction: 0.05, collisionFilter: { group: 1 } }),
      // Right wall - moved inward to prevent overflow
      Matter.Bodies.rectangle(width - wallPadding + wallThickness / 2, height / 2, wallThickness, height * 2, { isStatic: true, restitution: 0.6, friction: 0.05, collisionFilter: { group: 1 } }),
      // Bottom wall
      Matter.Bodies.rectangle(width / 2, height + wallThickness / 2, width * 2, wallThickness, { isStatic: true, restitution: 0.6, friction: 0.05, collisionFilter: { group: 1 } }),
    ]
    Matter.Composite.add(engine.world, walls)

    const mouse = Matter.Mouse.create(container)
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.05, damping: 0.1, render: { visible: false } }
    })

    mouse.element.removeEventListener('mousewheel', (mouse as unknown as { mousewheel: EventListener }).mousewheel)
    mouse.element.removeEventListener('DOMMouseScroll', (mouse as unknown as { mousewheel: EventListener }).mousewheel)

    Matter.Composite.add(engine.world, mouseConstraint)
    mouseConstraintRef.current = mouseConstraint

    Matter.Events.on(mouseConstraint, 'startdrag', () => { setIsDragging(true) })
    Matter.Events.on(mouseConstraint, 'enddrag', () => { setTimeout(() => setIsDragging(false), 50) })

    const update = () => {
      Matter.Engine.update(engine, 1000 / 60)

      // Update positions directly via DOM for perfect sync with canvas
      physicsBodies.forEach(({ body, config }) => {
        const scaledWidth = config.width * calculatedScale
        const scaledHeight = config.height * calculatedScale
        const totalWidth = scaledWidth + frameWidth
        const totalHeight = scaledHeight + frameHeight
        const x = body.position.x
        const y = body.position.y
        const angle = body.angle

        // Store position in ref for click handler
        positionsRef.current.set(config.id, { x, y, angle })

        // Directly update DOM element
        const el = photoRefs.current.get(config.id)
        if (el) {
          el.style.left = `${x - totalWidth / 2}px`
          el.style.top = `${y - totalHeight / 2}px`
          el.style.transform = `rotate(${angle}rad)`
        }
      })

      bodiesRef.current.forEach((pb) => {
        pb.anchorPoint.y = pb.constraint.pointA.y
      })

      drawStrings()
      animationFrameRef.current = requestAnimationFrame(update)
    }

    setTimeout(() => { setIsInitialized(true); update() }, 100)

    const handleResize = () => {
      const newRect = container.getBoundingClientRect()
      physicsBodies.forEach(({ constraint, config }) => {
        constraint.pointA.x = (config.anchorX / 100) * newRect.width
      })
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameRef.current)
      window.removeEventListener('resize', handleResize)
      Matter.Engine.clear(engine)
      Matter.Composite.clear(engine.world, false)
    }
  }, [drawStrings])

  useEffect(() => {
    const container = containerRef.current
    if (!container || !mouseConstraintRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const mouse = mouseConstraintRef.current?.mouse
      if (mouse) { mouse.position.x = e.clientX - rect.left; mouse.position.y = e.clientY - rect.top }
    }

    const handleMouseDown = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const mouse = mouseConstraintRef.current?.mouse
      if (mouse) { mouse.position.x = e.clientX - rect.left; mouse.position.y = e.clientY - rect.top; mouse.button = 0 }
    }

    const handleMouseUp = () => {
      const mouse = mouseConstraintRef.current?.mouse
      if (mouse) { mouse.button = -1 }
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mousedown', handleMouseDown)
    container.addEventListener('mouseup', handleMouseUp)
    container.addEventListener('mouseleave', handleMouseUp)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mousedown', handleMouseDown)
      container.removeEventListener('mouseup', handleMouseUp)
      container.removeEventListener('mouseleave', handleMouseUp)
    }
  }, [isInitialized])

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeExpanded()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closeExpanded])

  const scaledFramePadding = FRAME_PADDING * scale
  const frameWidth = scaledFramePadding * 2
  const frameHeight = scaledFramePadding * 2

  return (
    <>
      <div ref={containerRef} className="absolute inset-0 overflow-hidden" style={{ cursor: isDragging ? 'grabbing' : 'default' }}>
        <canvas ref={canvasRef} className="absolute pointer-events-none" style={{ zIndex: 10, left: 0, top: 0 }} />
        {photos.map((photo, index) => {
          const scaledWidth = photo.width * scale
          const scaledHeight = photo.height * scale
          const totalWidth = scaledWidth + frameWidth
          const totalHeight = scaledHeight + frameHeight
          const isHovered = hoveredId === photo.id
          const isExpanded = expandedPhoto?.id === photo.id
          return (
            <div key={photo.id} className="absolute"
              ref={(el) => { if (el) photoRefs.current.set(photo.id, el) }}
              onMouseDown={handlePhotoMouseDown}
              onClick={(e) => handlePhotoClick(e, photo)}
              style={{
                width: totalWidth, height: totalHeight,
                left: 0, top: 0,
                transformOrigin: 'center center',
                zIndex: isHovered ? 20 : 5 + index,
                cursor: isDragging ? 'grabbing' : 'pointer',
                opacity: isInitialized ? (isExpanded ? 0 : 1) : 0,
              }}
              onMouseEnter={() => setHoveredId(photo.id)}
              onMouseLeave={() => setHoveredId(null)}>
              <div className="w-full h-full rounded-sm"
                style={{
                  padding: scaledFramePadding,
                  paddingBottom: scaledFramePadding + 8 * scale,
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f8 100%)',
                  boxShadow: isHovered
                    ? '0 25px 50px rgba(0,0,0,0.25), 0 10px 20px rgba(0,0,0,0.15)'
                    : '0 8px 25px rgba(0,0,0,0.15), 0 3px 10px rgba(0,0,0,0.1)',
                  border: '1px solid rgba(0,0,0,0.08)',
                  transform: isHovered && !isExpanded ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.2s ease-out, box-shadow 0.2s ease-out',
                }}>
                <div className="w-full h-full overflow-hidden" style={{ borderRadius: 2 }}>
                  <img src={photo.imageUrl} alt={photo.caption} className="w-full h-full object-cover" draggable={false} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Expanded photo overlay */}
      {expandedPhoto && expandedPos && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={closeExpanded}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(8px)' }}
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: 'expandIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            <div
              className="rounded-lg overflow-hidden"
              style={{
                padding: FRAME_PADDING * 1.5,
                paddingBottom: FRAME_PADDING * 1.5 + 12,
                background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f8 100%)',
                boxShadow: '0 40px 80px rgba(0,0,0,0.4), 0 20px 40px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <div className="overflow-hidden" style={{ borderRadius: 4 }}>
                <img
                  src={expandedPhoto.imageUrl.replace(/\/\d+\/\d+$/, '/600/760')}
                  alt={expandedPhoto.caption}
                  className="object-cover"
                  style={{ width: 300, height: 380 }}
                  draggable={false}
                />
              </div>
            </div>
            <p
              className="text-center mt-4 text-white/90 text-sm max-w-xs mx-auto"
              style={{ fontStyle: 'italic' }}
            >
              {expandedPhoto.caption}
            </p>
            <button
              onClick={closeExpanded}
              className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center transition-colors shadow-lg"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes expandIn {
          from {
            opacity: 0;
            transform: scale(0.8);
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
