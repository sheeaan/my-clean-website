'use client'

import { useState } from 'react'
import { CatArt } from './art'

/** The pixel cat: naps, wakes when you come near, purrs when petted. `bubble` overrides what it says. */
export function Cat({ bubble }: { bubble?: string | null }) {
  const [pets, setPets] = useState(0)
  const purr = pets >= 10 ? 'best friends now :3' : pets === 1 ? 'purr' : `purr x${pets}`
  const say = bubble || (pets > 0 ? purr : null)
  return (
    <button className="cat" type="button" onClick={() => setPets(pets + 1)} aria-label="Pet the cat">
      <span className="zz" aria-hidden="true">
        <span>z</span>
        <span>z</span>
        <span>z</span>
      </span>
      {say && (
        <span className="bubble" aria-live="polite">
          {say}
        </span>
      )}
      <span className="sq">
        <CatArt />
      </span>
    </button>
  )
}
