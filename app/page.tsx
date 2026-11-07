import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Sky } from '@/components/Sky'
import { PageEffects } from '@/components/PageEffects'
import { HomeFooter } from '@/components/HomeFooter'
import { PolaroidMedia } from '@/components/PolaroidMedia'
import { HOME, type Project } from '@/lib/projects'
import photo1 from '@/public/20250816_153904.jpg'
import photo2 from '@/public/20260102_090622 (2).jpg'
import photo3 from '@/public/PXL_20240810_125626559.NIGHT.jpg'
import photo4 from '@/public/20240730_100559.jpg'
import photo5 from '@/public/drumming.jpg'
import photo6 from '@/public/20250701_225308.jpg'
import photo7 from '@/public/deer.jpg'

/** One project in the home list: hover it for its little animation and a polaroid in the margin. */
function HomeRow({ p, n }: { p: Project; n: number }) {
  const h = p.home!
  return (
    <Link className="toc" href={`/projects#${p.id}`}>
      <span className="num">{String(n).padStart(2, '0')}</span>
      <span>
        <span className="toc-line">
          <span className="toc-name">{h.name}</span>
          <span className="lead" aria-hidden="true">{p.motif}</span>
          <span className="toc-date">{h.date}</span>
        </span>
        <span className="toc-desc">{h.dim ? `${h.desc} (${h.dim})` : h.desc}</span>
      </span>
      <span className="pol" style={{ '--r': h.tilt, width: `${h.width}px` } as CSSProperties}>
        <PolaroidMedia media={h.media} sizes={`${h.width - 20}px`} onHover />
        <span className="cap">{h.caption}</span>
      </span>
    </Link>
  )
}

export default function Home() {
  return (
    <div className="ph lay-center lines bg-none" style={{ minHeight: '100vh' }}>
      <Sky />
      <div id="top" className="wrap">
        <Header page="about" />

        <section aria-label="About" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <p className="hand" style={{ margin: "0 0 -10px", fontSize: "30px", lineHeight: "1", color: "var(--muted)", transform: "rotate(-2deg)", transformOrigin: "left bottom" }}>heya, it is i —</p>
        <h1 style={{ margin: "0", display: "flex", alignItems: "center", gap: "12px", fontSize: "30px", fontWeight: "500", letterSpacing: "-0.025em", lineHeight: "1.2" }}>
        <span className="rb">Shawn Wei</span>
        <img className="icat" src="/Icat.png" alt="" style={{ width: "26px", height: "auto" }} />
        </h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0 18px", fontSize: "14px" }}>
        <a className="lnk" href="https://github.com/sheeaan" style={{ padding: "8px 0" }}>github</a>
        <a className="lnk" href="https://www.linkedin.com/in/shawn-wei007/" style={{ padding: "8px 0" }}>linkedin</a>
        <a className="lnk" href="mailto:shawn.wei@uwaterloo.ca" style={{ padding: "8px 0" }}>email</a>
        <a className="lnk" href="/resume.pdf" style={{ padding: "8px 0" }}>resume.pdf</a>
        </div>
        </section>

        <section aria-labelledby="h4-now" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <p id="h4-now" className="bd" style={{ margin: "0 0 2px", fontStyle: "italic", color: "var(--muted)" }}><span>currently:</span></p>
        <p className="bt" style={{ margin: "0" }}><span>studying computer science @ <a className="pill" href="https://uwaterloo.ca"><img src="/waterloo-shield.png" alt="" style={{ width: "12px", height: "14px", objectFit: "contain", verticalAlign: "-2px", marginRight: "5px" }} />UWaterloo</a></span></p>
        <p className="bt" style={{ margin: "0" }}><span>AI software engineer @ <a className="pill" href="https://watai.ca"><img src="/watai.png" alt="" style={{ width: "14px", height: "14px", objectFit: "contain", verticalAlign: "-2px", marginRight: "5px" }} />wat.ai</a> <span className="dim">(building penpals, an RNN that draws)</span></span></p>
        </section>

        <section aria-labelledby="h4-prev" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <p id="h4-prev" className="bd" style={{ margin: "0 0 2px", fontStyle: "italic", color: "var(--muted)" }}><span>previously:</span></p>
        <p className="bt" style={{ margin: "0" }}><span>data engineering @ <a className="pill" href="https://www.td.com"><img src="/td.svg" alt="" style={{ width: "14px", height: "14px", objectFit: "contain", verticalAlign: "-2px", marginRight: "5px" }} />TD</a> <span className="dim">(pipelines over 15M+ customer profiles, a RAG assistant for 170+ colleagues)</span></span></p>
        <p className="bt" style={{ margin: "0" }}><span>programming lead @ <a className="pill" href="https://frc.silverknights.ca/"><img src="/media/frc9569.png" alt="" style={{ width: "14px", height: "14px", objectFit: "contain", verticalAlign: "-2px", marginRight: "5px" }} />FRC 9569</a> <span className="dim">(vision-guided autonomy, the team's first Rookie All-Star Award)</span></span></p>
        </section>

        <section aria-labelledby="h4-proj" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <p id="h4-proj" className="bd" style={{ margin: "0 0 2px", fontStyle: "italic", color: "var(--muted)" }}><span>from thought to product:</span></p>
          <div className="plist">
            {HOME.map((p, i) => (
              <HomeRow key={p.id} p={p} n={i + 1} />
            ))}
          </div>
          <Link className="lnk" href="/projects" style={{ alignSelf: "flex-start", marginLeft: "20px", padding: "8px 0", fontSize: "14px" }}>
            the full stories →
          </Link>
        </section>

        <section className="else" aria-labelledby="h4-else" style={{ position: "relative", display: "flex", flexDirection: "column", gap: "10px" }}>
        <p id="h4-else" className="bd" style={{ margin: "0 0 2px", fontStyle: "italic", color: "var(--muted)" }}><span>otherwise:</span></p>
        <p style={{ margin: "0 0 0 20px", lineHeight: "2.05", textWrap: "pretty" }}>i'm usually out exploring the world. i've <button className="ph-btn" type="button">walked the camino de santiago<span className="pol" style={{ "--r": "-3deg", width: "220px" } as CSSProperties}><Image src={photo1} alt="On the Camino de Santiago in western Spain" sizes="200px" /><span className="cap">camino de santiago</span><span className="stamp" style={{ "--c": "#2b50c8", right: "10px", bottom: "44px", padding: "6px 9px", borderRadius: "3px", transform: "rotate(-9deg)" } as CSSProperties}><span style={{ fontSize: "8px" }}>santiago</span><span style={{ fontSize: "11px", fontWeight: "500" }}>ES · aug 25</span></span></span></button> across spain, <button className="ph-btn" type="button">climbed mountains<span className="pol" style={{ "--r": "4deg", width: "176px" } as CSSProperties}><Image src={photo2} alt="Rainbow Mountain in the Peruvian Andes" sizes="156px" /><span className="cap">rainbow mountain, peru</span><span className="stamp" style={{ "--c": "#b0336a", right: "8px", bottom: "50px", width: "74px", height: "74px", borderRadius: "50%", transform: "rotate(10deg)" } as CSSProperties}><span style={{ fontSize: "8px" }}>vinicunca</span><span style={{ fontSize: "12px", fontWeight: "500" }}>5,100 m</span><span style={{ fontSize: "8px" }}>PE · jan 26</span></span></span></button> in the andes, and <button className="ph-btn" type="button">pulled up to tokyo car meets<span className="pol" style={{ "--r": "-2deg", width: "164px" } as CSSProperties}><Image src={photo3} alt="A Nissan R-34 Skyline in Tokyo at night" sizes="144px" /><span className="cap">tokyo drift irl</span><span className="stamp" style={{ "--c": "#bb3f0b", right: "8px", bottom: "44px", padding: "6px 11px", borderRadius: "999px", transform: "rotate(-6deg)" } as CSSProperties}><span style={{ fontSize: "8px" }}>arrival</span><span style={{ fontSize: "11px", fontWeight: "500" }}>tokyo · JP</span><span style={{ fontSize: "8px" }}>aug 24</span></span></span></button> in an <span style={{ whiteSpace: "nowrap" }}>R-34</span>. i have a <button className="ph-btn" type="button">passion for aviation<span className="pol" style={{ "--r": "3deg", width: "220px" } as CSSProperties}><Image src={photo4} alt="Inside the cockpit of an Air Canada Boeing 777-300ER" sizes="200px" /><span className="cap">i usually pay a visit to the cockpit</span><span className="stamp" style={{ "--c": "#1c7553", right: "10px", bottom: "72px", padding: "6px 9px", borderRadius: "3px", transform: "rotate(7deg)" } as CSSProperties}><span style={{ fontSize: "8px" }}>flight deck</span><span style={{ fontSize: "11px", fontWeight: "500" }}>B777-300ER</span><span style={{ fontSize: "8px" }}>YVR · jul 24</span></span></span></button>, i <button className="ph-btn" type="button">play the drums<span className="pol" style={{ "--r": "-4deg", width: "172px" } as CSSProperties}><Image src={photo5} alt="Shawn playing the drums" sizes="152px" /><span className="cap">pop, rock, jazz</span></span></button>, and i'm into <button className="ph-btn" type="button">photography<span className="pol" style={{ "--r": "2deg", width: "176px" } as CSSProperties}><Image src={photo6} alt="A long-exposure light portal photo" sizes="156px" /><span className="cap">straight out of dr. strange</span></span></button> and like <button className="ph-btn" type="button">animals and nature<span className="pol" style={{ "--r": "-2deg", width: "220px" } as CSSProperties}><Image src={photo7} alt="A calm deer up close" sizes="200px" /><span className="cap">a very chill deer</span></span></button>.</p>
        </section>

        <HomeFooter style={{ marginTop: "36px", paddingTop: "18px", borderTop: "1px solid var(--rule)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "8px 16px", fontSize: "13px", color: "var(--muted)" }} />
      </div>
      <PageEffects hoverClips />
    </div>
  )
}
