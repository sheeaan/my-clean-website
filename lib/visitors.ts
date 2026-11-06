// The visitor count, from app/api/visitors. Each browser is counted once (it remembers in localStorage);
// after that it only reads the number. One request per page load, shared by everything that asks.
const KEY = 'counted'
let pending: Promise<number | null> | null = null

export function visitorCount(): Promise<number | null> {
  if (pending) return pending
  let counted = false
  try {
    counted = localStorage.getItem(KEY) === '1'
  } catch {}
  pending = fetch('/api/visitors', { method: counted ? 'GET' : 'POST' })
    .then((r) => (r.ok ? r.json() : null))
    .then((j: { count?: unknown } | null) => {
      const n = j && typeof j.count === 'number' ? j.count : null
      if (n !== null && !counted) {
        try {
          localStorage.setItem(KEY, '1')
        } catch {}
      }
      return n
    })
    .catch(() => null)
  return pending
}
