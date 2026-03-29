import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

/* Splits text into individually animated letter spans */
function LetterReveal({ text, delay = 0, style = {}, className = '' }) {
  return (
    <span className={`letter-reveal ${className}`} style={style}>
      {text.split('').map((char, i) => (
        char === ' '
          ? <span key={i} style={{ display: 'inline-block', width: '0.28em' }} />
          : <span
              key={i}
              className="letter"
              style={{ animationDelay: `${delay + i * 0.038}s` }}
            >
              {char}
            </span>
      ))}
    </span>
  )
}

/* ─── Orbital System Canvas ────────────────────────────────────────────────── */

const TECH_NODES  = ['PyTorch', 'Walmart', 'Research', 'Time Series', 'Open Source']
const STORY_NODES = ['The Artist', 'Podcast', 'Fiction']

// Seeded star positions — stable across renders, scaled to canvas fractions
const STARS = Array.from({ length: 52 }, (_, i) => ({
  fx: ((i * 137.508) % 1000) / 1000,
  fy: ((i * 97.313)  % 1000) / 1000,
  r:  i % 3 === 0 ? 1.1 : 0.52,
  a:  0.10 + (i % 7) * 0.04,
}))

function OrbitalSystem({ width = 520, height = 560 }) {
  const canvasRef  = useRef(null)
  const wrapperRef = useRef(null)
  // shared mouse state between event listeners and the rAF draw loop
  const mouseRef   = useRef({ nx: 0, ny: 0, inside: false })

  // Mouse / pointer event listeners on the wrapper (not canvas, to avoid capture issues)
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const onEnter = ()  => { mouseRef.current.inside = true }
    const onLeave = ()  => { mouseRef.current.inside = false }
    const onMove  = (e) => {
      const r = el.getBoundingClientRect()
      mouseRef.current.nx = ((e.clientX - r.left) / r.width  - 0.5) * 2
      mouseRef.current.ny = ((e.clientY - r.top)  / r.height - 0.5) * 2
    }
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    el.addEventListener('mousemove',  onMove)
    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
      el.removeEventListener('mousemove',  onMove)
    }
  }, [])

  // Main draw loop — tilt lerp lives here so it stays in sync with rAF
  useEffect(() => {
    const canvas  = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return

    const ctx = canvas.getContext('2d')
    const W = width, H = height
    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width  = W * DPR
    canvas.height = H * DPR
    canvas.style.width  = `${W}px`
    canvas.style.height = `${H}px`
    ctx.scale(DPR, DPR)

    const cx = W / 2, cy = H / 2
    const R_INNER   = 116   // tech orbit radius
    const R_OUTER   = 180   // story orbit radius
    const TRAIL_LEN = 68    // long glowing comet tail

    const techTrails  = TECH_NODES.map(() => [])
    const storyTrails = STORY_NODES.map(() => [])
    let corePhase = 0
    let rx = 0, ry = 0   // current tilt (lerped)
    let animId

    // Draw a comet trail from an array of {x,y} history
    const drawTrail = (trail, r, g, b) => {
      for (let i = 1; i < trail.length; i++) {
        const f = i / trail.length
        ctx.beginPath()
        ctx.moveTo(trail[i - 1].x, trail[i - 1].y)
        ctx.lineTo(trail[i].x,     trail[i].y)
        ctx.strokeStyle = `rgba(${r},${g},${b},${(f * f * 0.72).toFixed(3)})`
        ctx.lineWidth   = f * 3.0
        ctx.lineCap     = 'round'
        ctx.stroke()
      }
    }

    const draw = (t) => {
      // ── 3D tilt — lerp inside rAF so it's perfectly frame-synced ──
      const { nx, ny, inside } = mouseRef.current
      rx += ((inside ? -ny * 9  : 0) - rx) * 0.055
      ry += ((inside ?  nx * 13 : 0) - ry) * 0.055
      wrapper.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`

      ctx.clearRect(0, 0, W, H)

      // ── Nebula background glow ──
      const neb = ctx.createRadialGradient(cx, cy, 0, cx, cy, R_OUTER * 1.4)
      neb.addColorStop(0,    'rgba(59,130,246,0.055)')
      neb.addColorStop(0.45, 'rgba(245,158,11,0.03)')
      neb.addColorStop(1,    'rgba(0,0,0,0)')
      ctx.fillStyle = neb
      ctx.fillRect(0, 0, W, H)

      // ── Stars ──
      STARS.forEach(s => {
        ctx.beginPath()
        ctx.arc(s.fx * W, s.fy * H, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${(s.a + Math.sin(t * 0.001 + s.fx * 9) * 0.06).toFixed(3)})`
        ctx.fill()
      })

      // ── Orbit rings ──
      ctx.save(); ctx.setLineDash([3, 7])
      ctx.beginPath(); ctx.arc(cx, cy, R_INNER, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(59,130,246,0.15)'; ctx.lineWidth = 1; ctx.stroke()
      ctx.restore()

      ctx.save(); ctx.setLineDash([2, 9])
      ctx.beginPath(); ctx.arc(cx, cy, R_OUTER, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(245,158,11,0.12)'; ctx.lineWidth = 1; ctx.stroke()
      ctx.restore()

      // ── Node positions ──
      const ts =  t * 0.00038   // tech: clockwise
      const ss = -t * 0.00022   // story: counter-clockwise

      const techPos = TECH_NODES.map((_, i) => {
        const a = ts + (i / TECH_NODES.length) * Math.PI * 2
        return { x: cx + Math.cos(a) * R_INNER, y: cy + Math.sin(a) * R_INNER, a }
      })
      const storyPos = STORY_NODES.map((_, i) => {
        const a = ss + (i / STORY_NODES.length) * Math.PI * 2
        return { x: cx + Math.cos(a) * R_OUTER, y: cy + Math.sin(a) * R_OUTER, a }
      })

      // ── Accumulate trail history ──
      techPos.forEach((p, i)  => { techTrails[i].push({x:p.x,y:p.y});  if (techTrails[i].length  > TRAIL_LEN) techTrails[i].shift()  })
      storyPos.forEach((p, i) => { storyTrails[i].push({x:p.x,y:p.y}); if (storyTrails[i].length > TRAIL_LEN) storyTrails[i].shift() })

      // ── Draw trails (behind nodes) ──
      techTrails.forEach(tr  => drawTrail(tr,  96, 165, 250))
      storyTrails.forEach(tr => drawTrail(tr, 251, 191,  36))

      // ── Connection beam: fires when any tech+story node share an angle ──
      // Use atan2 from actual positions to get the true geometric angle.
      let maxBeam = 0, beamA = 0
      techPos.forEach(tp => {
        storyPos.forEach(sp => {
          const ta = Math.atan2(tp.y - cy, tp.x - cx)  // range -π..π
          const sa = Math.atan2(sp.y - cy, sp.x - cx)
          let diff = Math.abs(ta - sa)
          if (diff > Math.PI) diff = Math.PI * 2 - diff
          if (diff < 0.30) {
            const strength = (0.30 - diff) / 0.30
            if (strength > maxBeam) { maxBeam = strength; beamA = (ta + sa) * 0.5 }
          }
        })
      })
      if (maxBeam > 0.02) {
        const ext = R_OUTER + 18
        const x1 = cx + Math.cos(beamA + Math.PI) * ext, y1 = cy + Math.sin(beamA + Math.PI) * ext
        const x2 = cx + Math.cos(beamA)            * ext, y2 = cy + Math.sin(beamA)            * ext
        const bg = ctx.createLinearGradient(x1, y1, x2, y2)
        bg.addColorStop(0,    `rgba(245,158,11,0)`)
        bg.addColorStop(0.3,  `rgba(245,158,11,${(maxBeam * 0.35).toFixed(3)})`)
        bg.addColorStop(0.5,  `rgba(255,255,255,${(maxBeam * 0.70).toFixed(3)})`)
        bg.addColorStop(0.7,  `rgba(96,165,250,${(maxBeam * 0.35).toFixed(3)})`)
        bg.addColorStop(1,    `rgba(96,165,250,0)`)
        ctx.save()
        ctx.shadowBlur  = 12 * maxBeam
        ctx.shadowColor = `rgba(255,255,255,${(maxBeam * 0.55).toFixed(3)})`
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2)
        ctx.strokeStyle = bg; ctx.lineWidth = 1.5 + maxBeam * 2.5; ctx.stroke()
        ctx.restore()
      }

      // ── Tech nodes: slowly-rotating diamonds ──
      techPos.forEach((p, i) => {
        const sz  = 8
        const rot = t * 0.0009 + i * 1.1

        // soft radial glow halo
        const gh = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, sz * 4)
        gh.addColorStop(0, 'rgba(59,130,246,0.30)'); gh.addColorStop(1, 'rgba(59,130,246,0)')
        ctx.beginPath(); ctx.arc(p.x, p.y, sz * 4, 0, Math.PI * 2); ctx.fillStyle = gh; ctx.fill()

        // diamond body (square rotated 45° + slow spin)
        ctx.save()
        ctx.translate(p.x, p.y); ctx.rotate(Math.PI / 4 + rot)
        ctx.shadowBlur = 14; ctx.shadowColor = '#3b82f6'
        ctx.fillStyle  = '#60a5fa'
        ctx.fillRect(-sz / 2, -sz / 2, sz, sz)
        ctx.restore()

        // label: anchored at fixed radius from center — always 'center'/'middle', never jumps
        const lx = cx + Math.cos(p.a) * (R_INNER + 24)
        const ly = cy + Math.sin(p.a) * (R_INNER + 24)
        ctx.save()
        ctx.font = '8.5px JetBrains Mono, monospace'
        ctx.fillStyle    = 'rgba(148,163,184,0.90)'
        ctx.textAlign    = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(TECH_NODES[i], lx, ly)
        ctx.restore()
      })

      // ── Story nodes: glowing circles ──
      storyPos.forEach((p, i) => {
        const nr = 6.5

        // glow halo
        const gh = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, nr * 4)
        gh.addColorStop(0, 'rgba(245,158,11,0.34)'); gh.addColorStop(1, 'rgba(245,158,11,0)')
        ctx.beginPath(); ctx.arc(p.x, p.y, nr * 4, 0, Math.PI * 2); ctx.fillStyle = gh; ctx.fill()

        // circle body
        ctx.save()
        ctx.shadowBlur = 16; ctx.shadowColor = '#f59e0b'
        ctx.beginPath(); ctx.arc(p.x, p.y, nr, 0, Math.PI * 2)
        ctx.fillStyle = '#fcd34d'; ctx.fill()
        ctx.restore()

        // label: same fixed-radius trick — no conditional alignment, never jumps
        const lx = cx + Math.cos(p.a) * (R_OUTER + 22)
        const ly = cy + Math.sin(p.a) * (R_OUTER + 22)
        ctx.save()
        ctx.font = '9px JetBrains Mono, monospace'
        ctx.fillStyle    = 'rgba(253,230,138,0.92)'
        ctx.textAlign    = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(STORY_NODES[i], lx, ly)
        ctx.restore()
      })

      // ── Central core: multi-layer pulsing orb ──
      corePhase += 0.018
      const pulse = 0.88 + Math.sin(corePhase) * 0.12
      const cr    = 13 * pulse

      // wide aura
      const aura = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr * 5.2)
      aura.addColorStop(0,    'rgba(255,255,255,0.16)')
      aura.addColorStop(0.30, 'rgba(96,165,250,0.10)')
      aura.addColorStop(0.60, 'rgba(245,158,11,0.05)')
      aura.addColorStop(1,    'rgba(0,0,0,0)')
      ctx.beginPath(); ctx.arc(cx, cy, cr * 5.2, 0, Math.PI * 2)
      ctx.fillStyle = aura; ctx.fill()

      // concentric glowing rings
      ;[2.8, 1.8, 1.0].forEach((m, idx) => {
        const a  = [0.06, 0.14, 0.30][idx]
        const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr * m)
        rg.addColorStop(0, `rgba(255,255,255,${(a * 2.0).toFixed(3)})`)
        rg.addColorStop(1, `rgba(96,165,250,${a.toFixed(3)})`)
        ctx.save()
        ctx.shadowBlur  = 20 * m; ctx.shadowColor = 'rgba(96,165,250,0.55)'
        ctx.beginPath(); ctx.arc(cx, cy, cr * m, 0, Math.PI * 2)
        ctx.fillStyle = rg; ctx.fill()
        ctx.restore()
      })

      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animId)
  }, [width, height])

  return (
    <div
      ref={wrapperRef}
      style={{ display: 'inline-block', willChange: 'transform', lineHeight: 0 }}
    >
      <canvas ref={canvasRef} style={{ display: 'block', borderRadius: 16 }} />
    </div>
  )
}

/* Stats that replace the old pill badges */
const stats = [
  { value: '15+',    label: 'Years in Data',       sub: 'AI & Analytics',           color: 'tech' },
  { value: '40',     label: 'Under 40',            sub: 'Data Scientist · AIM',     color: 'tech' },
  { value: '1,600+', label: 'GitHub Stars',        sub: 'PyTorch Tabular',          color: 'tech' },
  { value: '5',      label: 'Research Papers',     sub: 'Published Research',       color: 'tech' },
  { value: '2',      label: 'Patents',             sub: 'AI Innovations',           color: 'tech' },
  { value: '1',      label: 'Debut Novel',         sub: 'The Artist · 2024',        color: 'creative' },
]

export default function Hero() {

  return (
    <div className="container" style={{ 
      paddingTop: 'clamp(80px, 15vh, 120px)', 
      paddingBottom: 'clamp(40px, 10vh, 80px)', 
      width: '100%',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 40, alignItems: 'center', width: '100%' }} className="hero-grid">

        {/* ── Left: text ── */}
        <div style={{ maxWidth: 800 }}>

          {/* Location pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            marginBottom: 'clamp(24px, 5vh, 36px)',
            animation: 'fadeIn 0.6s ease both',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', animation: 'blink 2.5s infinite' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Bangalore, India
            </span>
          </div>

          {/* Main title — letter reveal */}
          <h1 style={{
            fontSize: 'clamp(2.8rem, 9vw, 6rem)',
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            marginBottom: 24,
          }}>
            <LetterReveal text="Manu" delay={0.05} style={{ display: 'block' }} />
            <LetterReveal text="Joseph." delay={0.25} style={{ display: 'block', color: 'var(--text-secondary)' }} />
          </h1>

          {/* Role line */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px 16px', flexWrap: 'wrap',
            marginBottom: 'clamp(32px, 6vh, 48px)',
            animation: 'fadeInUp 0.6s ease 0.55s both',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 'clamp(12px, 1.8vw, 15px)',
              color: 'var(--tech-light)', letterSpacing: '0.04em',
            }}>
              Principal Data Scientist
            </span>
            <span style={{ color: 'var(--border-mid)', fontSize: 16 }} className="desktop-only">·</span>
            <span style={{
              fontFamily: 'var(--font-sans)', fontStyle: 'italic',
              fontSize: 'clamp(12px, 1.8vw, 15px)',
              color: 'var(--creative-light)',
            }}>
              Psychological Thriller Author
            </span>
            <span style={{ color: 'var(--border-mid)', fontSize: 16 }} className="desktop-only">·</span>
            <span style={{
              fontFamily: 'var(--font-sans)', fontSize: 'clamp(12px, 1.8vw, 15px)',
              color: '#fff',
            }}>
              Open Source Creator
            </span>
          </div>

          {/* ── STAT STRIP — replaces the old pills ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            borderTop: '1px solid var(--border)',
            borderLeft: '1px solid var(--border)',
            borderRadius: 10,
            overflow: 'hidden',
            marginBottom: 'clamp(32px, 6vh, 48px)',
            animation: 'fadeInUp 0.6s ease 0.65s both',
          }} className="stat-strip">
            {stats.map((s, i) => (
              <div key={i} style={{
                padding: 'clamp(14px, 3vw, 20px) clamp(12px, 2.5vw, 18px)',
                borderRight: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
                background: 'rgba(255,255,255,0.015)',
                transition: 'background 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={e => e.currentTarget.style.background = s.color === 'tech' ? 'rgba(59,130,246,0.06)' : 'rgba(245,158,11,0.06)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.015)'}
              >
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(1.1rem, 2.8vw, 1.6rem)',
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: 6,
                  color: s.color === 'tech' ? 'var(--tech-light)' : 'var(--creative-light)',
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontSize: 'clamp(11px, 1.5vw, 13px)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: 2,
                  lineHeight: 1.2,
                }}>
                  {s.label}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.04em',
                }}>
                  {s.sub}
                </div>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div style={{
            display: 'flex', gap: 12, flexWrap: 'wrap',
            animation: 'fadeInUp 0.6s ease 0.75s both',
          }}>
            <Link to="/builder" className="btn btn-solid" style={{ fontSize: 13, padding: '11px 22px' }}>
              Explore the Science →
            </Link>
            <Link to="/storyteller" className="btn btn-creative" style={{ fontSize: 13, padding: '11px 22px' }}>
              Read the Story →
            </Link>
            <a href="#about" className="btn btn-ghost" style={{ fontSize: 13, padding: '11px 22px' }}>
              About Me
            </a>
          </div>
        </div>

        {/* ── Right: Orbital System ── */}
        <div style={{ flexShrink: 0, opacity: 0, animation: 'fadeIn 1.2s ease 0.8s both' }} className="hero-shapes">
          <OrbitalSystem width={480} height={520} />
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; justify-items: center; }
          .hero-shapes { order: -1; margin-bottom: 40px; }
          .hero-shapes div { transform: scale(0.85); margin: 0 auto; }
          .stat-strip { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .hero-grid { text-align: left; justify-items: start; }
          .hero-shapes { display: none !important; }
          .stat-strip { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .stat-strip { grid-template-columns: 1fr !important; }
          .hero-grid h1 { font-size: 2.1rem !important; line-height: 1.15 !important; overflow-wrap: break-word; }
          .stat-strip > div { padding: 12px 16px !important; }
        }
      `}</style>
    </div>
  )
}
