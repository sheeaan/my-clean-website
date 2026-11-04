'use client'

import { useEffect, useRef } from 'react'
import { startSky } from './sky/engine'
import { TWINKLES } from './sky/twinkles'

const CLOUDS = [0, 1, 2, 3, 4]

/**
 * The sky behind the page: a fixed layer of canvases that the engine (./sky/engine.js) draws into.
 * The engine was written against the design mockup's component, so `host` gives it the same shape:
 * its canvases, its settings, whether it's dark, and setState({ look }) for the cat glancing up at a plane.
 */
export function Sky() {
  const sky = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const box = sky.current
    const root = box?.parentElement
    if (!box || !root) return
    const q = (sel: string) => box.querySelectorAll<HTMLCanvasElement>(sel)
    const [air0, air1] = Array.from(q('canvas.air'))
    const clouds = Array.from(q('canvas.cloud'))
    const LOOK = ['look', 'look-u', 'look-l', 'look-r']
    const host: Record<string, unknown> = {
      _starsEl: box.querySelector('canvas.stars'),
      _fxEl: box.querySelector('canvas.fx'),
      _linesEl: box.querySelector('canvas.lines'),
      _trailEl: box.querySelector('canvas.trail'),
      _air0: air0,
      _air1: air1,
      props: { flights: 'occasional', events: 'rare' },
      state: {},
      setState(s: { look?: string | null }) {
        if (!('look' in s)) return
        root.classList.remove(...LOOK)
        if (s.look) root.classList.add('look', 'look-' + s.look)
      },
    }
    clouds.forEach((el, i) => (host['_cloud' + i] = el))
    Object.defineProperty(host, '_dark', { get: () => document.documentElement.classList.contains('dark') })
    const stop = startSky(host) as (() => void) | undefined
    return () => {
      stop?.()
      root.classList.remove(...LOOK)
    }
  }, [])

  return (
    <div className="sky" aria-hidden="true" ref={sky}>
      <canvas className="stars" />
      <canvas className="fx" />
      <canvas className="lines" />
      {TWINKLES.map(([left, top, dur, delay], i) => (
        <i
          key={i}
          className="tw"
          style={{ left: `${left}%`, top: `${top}%`, animationDuration: `${dur}s`, animationDelay: `${delay}s` }}
        />
      ))}
      <canvas className="trail" />
      <canvas className="air" />
      <canvas className="air" />
      {CLOUDS.map((i) => (
        <canvas key={i} className="cloud" />
      ))}
    </div>
  )
}
