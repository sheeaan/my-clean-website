'use client'

import { useState, type ReactNode } from 'react'

/** "skills, as a list ↓": shows the skills list (passed as children) on demand. */
export function SkillsToggle({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button className="lnk skb" type="button" onClick={() => setOpen(!open)} aria-expanded={open}>
        {open ? 'hide the skills list ↑' : 'skills, as a list ↓'}
      </button>
      {open && children}
    </>
  )
}
