import type { CSSProperties } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Sky } from '@/components/Sky'
import { PageEffects } from '@/components/PageEffects'
import { PolaroidMedia } from '@/components/PolaroidMedia'
import { SkillsToggle } from '@/components/SkillsToggle'
import { Cat } from '@/components/Cat'
import { Campfire } from '@/components/art'
import { PROJECTS, TAGS, type Project } from '@/lib/projects'

export const metadata = { title: 'projects · Shawn Wei' }

const COUNT = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve']

function ProjectCard({ p, n }: { p: Project; n: number }) {
  return (
    <article className="proj" id={p.id} style={{ '--ph': `${p.ph}px`, '--phs': `${p.phs}px` } as CSSProperties}>
      <span className="num">{String(n).padStart(2, '0')}</span>
      <div>
        <div className="p-head">
          <h2 className="p-name">{p.name}</h2>
          <span className="lead" aria-hidden="true">{p.motif}</span>
          <span className="p-date">{p.date}</span>
        </div>
        <p className="p-sub">
          {p.sub} <span className="dim">({p.dim})</span>
        </p>
        <ul className="p-pts">
          {p.points.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p className="p-tags">
          {p.tags.map((t) => (
            <span className="tag" key={t}>
              {TAGS[t]}
              {t}
            </span>
          ))}
          {p.link && (
            <a className="lnk p-src" href={p.link.href} target="_blank" rel="noopener">
              {p.link.label} ↗
            </a>
          )}
        </p>
      </div>
      <figure className="pol" style={{ '--r': p.tilt, '--wl': `${p.wl}px`, '--ws': `${p.ws}px` } as CSSProperties}>
        <PolaroidMedia media={p.media} sizes={`${p.wl - 20}px`} />
        <figcaption className="cap">{p.caption}</figcaption>
      </figure>
    </article>
  )
}

export default function Projects() {
  return (
    <div className="pj bg-none lines" style={{ minHeight: '100vh' }}>
      <Sky />
      <div id="top" className="wrap">
        <Header page="projects" />

        <section aria-labelledby="pj-title" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <p className="hand" style={{ margin: "0 0 -8px", fontSize: "30px", lineHeight: "1", color: "var(--muted)", transform: "rotate(-2deg)", transformOrigin: "left bottom" }}>the full stories —</p>
          <h1 id="pj-title" style={{ margin: "0", fontSize: "30px", fontWeight: "500", letterSpacing: "-0.025em", lineHeight: "1.2" }}>projects</h1>
          <p className="dim" style={{ margin: 0, textWrap: 'pretty' }}>
            {COUNT[PROJECTS.length] ?? PROJECTS.length} things i&apos;ve built, newest first.
          </p>
          <SkillsToggle>
            <dl className="skills">
            <div><dt>languages</dt><dd>Python, Java, C, C++, JavaScript, TypeScript, SQL, Bash</dd></div>
            <div><dt>ai/ml &amp; data</dt><dd>TensorFlow, LLM fine-tuning (LoRA), FP8 quantization, PySpark, Pandas, NumPy, Databricks</dd></div>
            <div><dt>frameworks</dt><dd>React, Next.js, Node.js, FastAPI, REST APIs, Flask, Django, Tailwind, WebSockets</dd></div>
            <div><dt>tools</dt><dd>Azure, Docker, Git, Linux/Unix, CI/CD, OpenCV, Salesforce</dd></div>
            </dl>
          </SkillsToggle>
        </section>

        <div className="plist">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} p={p} n={i + 1} />
          ))}
        </div>

        <div className="end">
          <div className="camp">
            <Campfire />
            <Cat />
          </div>
          <p className="dim" style={{ margin: "0" }}>other projects are still cooking</p>
        </div>

        <footer className="foot">
        <p style={{ margin: "0" }}>say hi: <a className="lnk" href="mailto:shawn.wei@uwaterloo.ca">shawn.wei@uwaterloo.ca</a></p>
        <Link className="lnk" href="/" style={{ padding: "8px 0" }}>← back to about</Link>
        <p className="hand" style={{ margin: "0", fontSize: "24px", lineHeight: "1" }}>thanks for stopping by :D</p>
        </footer>
      </div>
      <PageEffects autoplay />
    </div>
  )
}
