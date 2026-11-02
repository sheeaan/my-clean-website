// Pixel art and icons from the design mockup.

/** The napping cat (eyes: es = asleep, eo = awake, eu-* = looking up at a plane). */
export function CatArt() {
  return (
    <svg className="px bob" width="48" height="42" viewBox="0 0 16 14" aria-hidden="true">
    <path className="f-bg" d="M3 2h1v1h-1zM12 2h1v1h-1zM3 3h2v1h-2zM11 3h2v1h-2zM2 4h12v1h-12zM2 5h12v1h-12zM1 6h14v1h-14zM1 7h14v1h-14zM1 8h14v1h-14zM1 9h14v1h-14zM2 10h12v1h-12zM2 11h12v1h-12zM4 12h8v1h-8z"></path>
    <path className="f-ink" d="M2 0h1v1h-1zM13 0h1v1h-1zM2 1h2v1h-2zM12 1h2v1h-2zM2 2h1v1h-1zM4 2h1v1h-1zM11 2h1v1h-1zM13 2h1v1h-1zM2 3h1v1h-1zM5 3h6v1h-6zM13 3h1v1h-1zM1 4h1v1h-1zM14 4h1v1h-1zM1 5h1v1h-1zM14 5h1v1h-1zM0 6h1v1h-1zM15 6h1v1h-1zM0 7h1v1h-1zM15 7h1v1h-1zM0 8h1v1h-1zM15 8h1v1h-1zM0 9h1v1h-1zM15 9h1v1h-1zM1 10h1v1h-1zM14 10h1v1h-1zM1 11h1v1h-1zM14 11h1v1h-1zM2 12h2v1h-2zM12 12h2v1h-2zM4 13h8v1h-8z"></path>
    <path className="f-ink eo" d="M4 6h2v1h-2zM10 6h2v1h-2zM4 7h2v1h-2zM10 7h2v1h-2z"></path>
    <path className="f-ink es" d="M4 7h2v1h-2zM10 7h2v1h-2z"></path>
    <path className="f-ink eu eu-u" d="M4 5h2v2h-2zM10 5h2v2h-2z"></path>
    <path className="f-ink eu eu-l" d="M3 5h2v2h-2zM9 5h2v2h-2z"></path>
    <path className="f-ink eu eu-r" d="M5 5h2v2h-2zM11 5h2v2h-2z"></path>
    <path className="f-ink" d="M5 9h1v1h-1zM7 9h2v1h-2zM10 9h1v1h-1zM6 10h1v1h-1zM9 10h1v1h-1z"></path>
    <path className="f-blush" d="M2 9h2v1h-2zM12 9h2v1h-2z"></path>
    </svg>
  )
}

/** The campfire on the projects page (two flame frames, fa/fb, swap in CSS). */
export function Campfire() {
  return (
    <svg className="px fire" width="64" height="64" viewBox="0 0 16 16" aria-hidden="true">
    <g className="fa"><path fill="#f0812f" d="M7 0h1v1h-1zM7 1h2v1h-2zM6 2h3v1h-3zM12 2h1v1h-1zM6 3h1v1h-1zM8 3h1v1h-1zM11 3h2v1h-2zM5 4h2v1h-2zM8 4h2v1h-2zM11 4h2v1h-2zM2 5h1v1h-1zM5 5h1v1h-1zM9 5h3v1h-3zM2 6h2v1h-2zM5 6h1v1h-1zM10 6h2v1h-2zM2 7h3v1h-3zM11 7h1v1h-1zM3 8h1v1h-1zM11 8h2v1h-2zM3 9h1v1h-1zM12 9h1v1h-1zM3 10h2v1h-2zM11 10h2v1h-2zM4 11h2v1h-2zM10 11h2v1h-2z"></path><path fill="#ffc23d" d="M7 3h1v1h-1zM7 4h1v1h-1zM6 5h3v1h-3zM6 6h4v1h-4zM5 7h2v1h-2zM8 7h3v1h-3zM4 8h2v1h-2zM9 8h2v1h-2zM4 9h2v1h-2zM10 9h2v1h-2zM5 10h1v1h-1zM10 10h1v1h-1zM6 11h4v1h-4z"></path><path fill="#fff1c1" d="M7 7h1v1h-1zM6 8h3v1h-3zM6 9h4v1h-4zM6 10h4v1h-4z"></path></g>
    <g className="fb"><path fill="#f0812f" d="M8 0h1v1h-1zM7 1h2v1h-2zM3 2h1v1h-1zM7 2h3v1h-3zM3 3h2v1h-2zM7 3h1v1h-1zM9 3h1v1h-1zM3 4h2v1h-2zM6 4h2v1h-2zM9 4h2v1h-2zM4 5h3v1h-3zM10 5h1v1h-1zM13 5h1v1h-1zM4 6h2v1h-2zM10 6h1v1h-1zM12 6h2v1h-2zM4 7h1v1h-1zM11 7h3v1h-3zM3 8h2v1h-2zM12 8h1v1h-1zM3 9h1v1h-1zM12 9h1v1h-1zM3 10h2v1h-2zM11 10h2v1h-2zM4 11h2v1h-2zM10 11h2v1h-2z"></path><path fill="#ffc23d" d="M8 3h1v1h-1zM8 4h1v1h-1zM7 5h3v1h-3zM6 6h4v1h-4zM5 7h3v1h-3zM9 7h2v1h-2zM5 8h2v1h-2zM10 8h2v1h-2zM4 9h2v1h-2zM10 9h2v1h-2zM5 10h1v1h-1zM10 10h1v1h-1zM6 11h4v1h-4z"></path><path fill="#fff1c1" d="M8 7h1v1h-1zM7 8h3v1h-3zM6 9h4v1h-4zM6 10h4v1h-4z"></path></g>
    <path fill="#8b5a33" d="M2 12h2v1h-2zM12 12h2v1h-2zM3 13h4v1h-4zM9 13h4v1h-4zM5 14h6v1h-6zM2 15h4v1h-4zM10 15h4v1h-4z"></path>
    <path fill="#5b3a1f" d="M1 12h1v1h-1zM14 12h1v1h-1zM1 15h1v1h-1zM14 15h1v1h-1z"></path>
    </svg>
  )
}

export function SunIcon() {
  return <svg className="ic sun" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
}

export function MoonIcon() {
  return <svg className="ic moon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
}
