'use client'

import { useEffect } from 'react'
import { visitorCount } from '@/lib/visitors'

/**
 * Page-wide behaviour with no markup of its own:
 * - hoverClips (home): a row's clip plays from the start while the row is hovered or focused; only on a mouse
 * - autoplay (projects): make sure the visible clips are muted and playing (browsers can miss the muted attribute)
 * - counts this browser as a visitor, once (see lib/visitors.ts)
 */
export function PageEffects({ hoverClips = false, autoplay = false }: { hoverClips?: boolean; autoplay?: boolean }) {
  useEffect(() => {
    visitorCount()
    const off: (() => void)[] = []
    const on = <K extends keyof DocumentEventMap>(type: K, f: (e: DocumentEventMap[K]) => void) => {
      document.addEventListener(type, f)
      off.push(() => document.removeEventListener(type, f))
    }

    const play = (v: HTMLVideoElement) => {
      v.muted = true
      v.play().catch(() => {})
    }
    if (autoplay) document.querySelectorAll<HTMLVideoElement>('.pol video[autoplay]').forEach(play)

    if (hoverClips && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      document.querySelectorAll<HTMLVideoElement>('.toc .pol video, .li .pol video').forEach((v) => {
        v.muted = true
        v.preload = 'auto'
        v.load()
      })
      const clip = (e: Event & { relatedTarget?: EventTarget | null }) => {
        const row = (e.target as Element | null)?.closest?.('a.toc, a.li')
        const to = e.relatedTarget as Node | null
        return row && !(to && row.contains(to)) ? row.querySelector<HTMLVideoElement>('.pol video') : null
      }
      const start = (e: Event) => {
        const v = clip(e)
        if (v) {
          v.currentTime = 0
          play(v)
        }
      }
      const stop = (e: Event) => clip(e)?.pause()
      on('pointerover', start)
      on('pointerout', stop)
      on('focusin', start)
      on('focusout', stop)
    }
    return () => off.forEach((f) => f())
  }, [hoverClips, autoplay])

  return null
}
