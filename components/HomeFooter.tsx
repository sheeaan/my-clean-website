'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { Cat } from './Cat'
import { visitorCount } from '@/lib/visitors'

/** The home footer: the napping cat, a way to say hi, and the ":D" that makes the cat tell you your visitor number. */
export function HomeFooter({ style }: { style: CSSProperties }) {
  const [count, setCount] = useState<number | null>(null)
  const [hi, setHi] = useState(false)
  useEffect(() => {
    visitorCount().then(setCount)
  }, [])
  return (
    <footer className="foot" style={style}>
      <Cat bubble={hi && count ? `you're visitor no. ${count.toLocaleString()}` : null} />
      <p style={{ margin: 0 }}>
        say hi:{' '}
        <a className="lnk" href="mailto:shawn.wei@uwaterloo.ca">
          shawn.wei@uwaterloo.ca
        </a>
      </p>
      <p className="hand" style={{ margin: 0, fontSize: 24, lineHeight: 1 }}>
        thanks for stopping by{' '}
        <span className="smile" onPointerEnter={() => setHi(true)} onPointerLeave={() => setHi(false)}>
          :D
        </span>
      </p>
    </footer>
  )
}
