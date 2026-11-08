import { NextResponse } from 'next/server'
import { createClient } from 'redis'

// The visitor counter (a hit counter): one number in a small Redis database, connected through Vercel's Storage tab.
// POST counts a visit and returns the new total, which is that visit's number; bots and crawlers aren't counted.
// GET only reads it. Without a database: in development it counts in memory, in production it returns null and the
// page simply doesn't show a number.
export const dynamic = 'force-dynamic'

// Find the database however Vercel named its settings, with or without a custom prefix:
// - a plain Redis connection string (Redis Cloud sets REDIS_URL), or
// - Upstash's web API (KV_REST_API_URL / UPSTASH_REDIS_REST_URL, with the token under the same name ending in TOKEN).
const env = process.env
const pick = (re: RegExp) => Object.keys(env).filter((k) => re.test(k)).sort((a, b) => a.length - b.length)[0]
const REST_KEY = pick(/(REST_API_URL|REDIS_REST_URL)$/)
const REST_URL = REST_KEY && env[REST_KEY]
const REST_TOKEN = REST_KEY && env[REST_KEY.replace(/URL$/, 'TOKEN')]
const TCP_KEY = pick(/(^|_)REDIS_URL$/)
const TCP_URL = TCP_KEY && env[TCP_KEY]

const KEY = 'visitors'
const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|headless|lighthouse|pingdom|monitor/i
// Visitors before this counter existed (Vercel Analytics, Nov 2026). The database counts from zero; this is added on.
const START = 450
let devCount = 0

// One connection per server instance, opened on first use and dropped (to reopen next time) if it ever errors.
const open = () => createClient({ url: TCP_URL as string, socket: { connectTimeout: 5000, reconnectStrategy: false } })
let conn: Promise<ReturnType<typeof open>> | null = null
function redis() {
  if (!conn) {
    const c = open()
    c.on('error', () => {
      conn = null
    })
    conn = c.connect().then(
      () => c,
      (e) => {
        conn = null
        throw e
      },
    )
  }
  return conn
}

async function total(add: boolean): Promise<number | null> {
  if (REST_URL && REST_TOKEN) {
    const r = await fetch(REST_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${REST_TOKEN}` },
      body: JSON.stringify([add ? 'INCR' : 'GET', KEY]),
      cache: 'no-store',
    })
    if (!r.ok) throw new Error(`redis ${r.status}`)
    const { result } = (await r.json()) as { result: string | number | null }
    return START + Number(result ?? 0)
  }
  if (TCP_URL) {
    const c = await redis()
    const v = add ? await c.incr(KEY) : await c.get(KEY)
    return START + Number(v ?? 0)
  }
  if (env.NODE_ENV === 'production') return null
  if (add) devCount++
  return START + devCount
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
