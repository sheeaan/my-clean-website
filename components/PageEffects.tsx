'use client'

import { useEffect } from 'react'
import { visitorCount } from '@/lib/visitors'

/**
 * Page-wide behaviour with no markup of its own:
 * - clean copy: copied text leaves out the polaroids (alt text, captions, stamps) and decorative bits (aria-hidden)
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

    on('copy', (e) => {
      const sel = window.getSelection()
      const active = document.activeElement
      if (!e.clipboardData || !sel || sel.isCollapsed || !sel.rangeCount) return
      if (active && /^(INPUT|TEXTAREA)$/.test(active.tagName)) return
      const box = document.createElement('div')
      for (let i = 0; i < sel.rangeCount; i++) box.appendChild(sel.getRangeAt(i).cloneContents())
      const junk = box.querySelectorAll('.pol, [aria-hidden="true"]')
      if (!junk.length) return // nothing hidden in it: the browser's own copy is already clean
      junk.forEach((n) => n.remove())
      const at = sel.getRangeAt(0).commonAncestorContainer
      const host = (at.nodeType === 1 ? (at as Element) : at.parentElement)?.closest('.ph, .pj') ?? document.body
      box.style.cssText = 'position:fixed;left:-99999px;top:0;width:800px'
      host.appendChild(box) // laid out, so innerText keeps the line breaks between blocks
      const text = box.innerText.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim()
      const html = box.innerHTML
      box.remove()
      e.clipboardData.setData('text/plain', text)
      e.clipboardData.setData('text/html', html)
      e.preventDefault()
    })

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
