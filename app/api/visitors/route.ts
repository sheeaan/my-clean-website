import { NextResponse } from 'next/server'

// The visitor counter (a hit counter): one number in a small Redis database (Upstash, added through Vercel's Storage
// tab, which sets the KV_REST_API_* or UPSTASH_REDIS_REST_* variables). POST counts a visit and returns the new total,
// which is that visit's number; bots and crawlers aren't counted. GET only reads it. Without a database: in
// development it counts in memory, in production it returns null and the page simply doesn't show a number.
export const dynamic = 'force-dynamic'

const URL_ = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL
const TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN
const KEY = 'visitors'
const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|headless|lighthouse|pingdom|monitor/i
let devCount = 0

async function total(add: boolean): Promise<number | null> {
  if (!URL_ || !TOKEN) {
    if (process.env.NODE_ENV === 'production') return null
    if (add) devCount++
    return devCount
  }
  const r = await fetch(URL_, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify([add ? 'INCR' : 'GET', KEY]),
    cache: 'no-store',
  })
  if (!r.ok) throw new Error(`redis ${r.status}`)
  const { result } = (await r.json()) as { result: string | number | null }
  return Number(result ?? 0)
}

async function reply(add: boolean) {
  try {
    return NextResponse.json({ count: await total(add) })
  } catch {
    return NextResponse.json({ count: null }, { status: 503 })
  }
}

export function GET() {
  return reply(false)
}

export function POST(req: Request) {
  return reply(!BOT.test(req.headers.get('user-agent') ?? ''))
}
