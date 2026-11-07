// The visitor count, from app/api/visitors: a hit counter. Every visit to the site adds one (a refresh or a later
// return counts again), and the number that comes back is this visit's number. Clicking between pages within the
// same visit doesn't count again: the one request per page load is shared by everything that asks.
let pending: Promise<number | null> | null = null

export function visitorCount(): Promise<number | null> {
  if (pending) return pending
  pending = fetch('/api/visitors', { method: 'POST' })
    .then((r) => (r.ok ? r.json() : null))
    .then((j: { count?: unknown } | null) => (j && typeof j.count === 'number' ? j.count : null))
    .catch(() => null)
  return pending
}
