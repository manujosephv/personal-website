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
  const shapeRef1 = useRef(null)
  const shapeRef2 = useRef(null)

  /* Parallax on mouse move */
  useEffect(() => {
    const onMove = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const dx = (e.clientX - cx) / cx
      const dy = (e.clientY - cy) / cy
      if (shapeRef1.current) {
        shapeRef1.current.style.transform = `translate(${dx * 18}px, ${dy * 12}px) rotate(${dx * 6}deg)`
      }
      if (shapeRef2.current) {
        shapeRef2.current.style.transform = `translate(${-dx * 12}px, ${-dy * 8}px) rotate(${-dx * 8}deg)`
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className="container" style={{ paddingTop: 100, paddingBottom: 80, width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }} className="hero-grid">

        {/* ── Left: text ── */}
        <div style={{ maxWidth: 700 }}>

          {/* Location pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            marginBottom: 36,
            animation: 'fadeIn 0.6s ease both',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', animation: 'blink 2.5s infinite' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Bangalore, India
            </span>
          </div>

          {/* Main title — letter reveal */}
          <h1 style={{
            fontSize: 'clamp(3.2rem, 8vw, 6.4rem)',
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: '-0.025em',
            marginBottom: 20,
          }}>
            <LetterReveal text="Manu" delay={0.05} style={{ display: 'block' }} />
            <LetterReveal text="Joseph." delay={0.25} style={{ display: 'block', color: 'var(--text-secondary)' }} />
          </h1>

          {/* Role line */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
            marginBottom: 56,
            animation: 'fadeInUp 0.6s ease 0.55s both',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.8rem, 1.8vw, 0.95rem)',
              color: 'var(--tech-light)', letterSpacing: '0.04em',
            }}>
              Principal Data Scientist
            </span>
            <span style={{ color: 'var(--border-mid)', fontSize: 18 }}>·</span>
            <span style={{
              fontFamily: 'var(--font-sans)', fontStyle: 'italic',
              fontSize: 'clamp(0.8rem, 1.8vw, 0.95rem)',
              color: 'var(--creative-light)',
            }}>
              Psychological Thriller Author
            </span>
            <span style={{ color: 'var(--border-mid)', fontSize: 18 }}>·</span>
            <span style={{
              fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.8rem, 1.8vw, 0.95rem)',
              color: 'var(--text-muted)',
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
            marginBottom: 48,
            animation: 'fadeInUp 0.6s ease 0.65s both',
          }} className="stat-strip">
            {stats.map((s, i) => (
              <div key={i} style={{
                padding: '20px 18px',
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
                  fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)',
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: 6,
                  color: s.color === 'tech' ? 'var(--tech-light)' : 'var(--creative-light)',
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: 2,
                  lineHeight: 1.2,
                }}>
                  {s.label}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
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
            <Link to="/builder" className="btn btn-solid" style={{ fontSize: 14, padding: '11px 24px' }}>
              Explore the Science →
            </Link>
            <Link to="/storyteller" className="btn btn-creative" style={{ fontSize: 14, padding: '11px 24px' }}>
              Read the Story →
            </Link>
            <a href="#about" className="btn btn-ghost" style={{ fontSize: 14, padding: '11px 24px' }}>
              About Me
            </a>
          </div>
        </div>

        {/* ── Right: floating geometric shapes ── */}
        <div style={{
          position: 'relative',
          width: 320, height: 420,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }} className="hero-shapes">

          {/* Large blue orb */}
          <div style={{
            position: 'absolute',
            width: 260, height: 260,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0.04) 50%, transparent 70%)',
            border: '1px solid rgba(59,130,246,0.12)',
            animation: 'float 7s ease-in-out infinite',
          }} />

          {/* Amber ring */}
          <div style={{
            position: 'absolute',
            width: 180, height: 180,
            borderRadius: '50%',
            border: '1px solid rgba(245,158,11,0.15)',
            top: 40, right: 20,
            animation: 'float 5s ease-in-out 1s infinite',
          }} />

          {/* Tech diamond */}
          <div
            ref={shapeRef1}
            style={{
              position: 'absolute',
              top: 30, right: 30,
              width: 60, height: 60,
              background: 'linear-gradient(135deg, rgba(59,130,246,0.5), rgba(59,130,246,0.1))',
              transform: 'rotate(45deg)',
              borderRadius: 6,
              transition: 'transform 0.3s ease',
              animation: 'floatAlt 6s ease-in-out infinite',
              boxShadow: '0 0 30px rgba(59,130,246,0.2)',
            }}
          />

          {/* Creative diamond */}
          <div
            ref={shapeRef2}
            style={{
              position: 'absolute',
              bottom: 50, left: 20,
              width: 44, height: 44,
              background: 'linear-gradient(135deg, rgba(245,158,11,0.5), rgba(245,158,11,0.1))',
              transform: 'rotate(45deg)',
              borderRadius: 4,
              transition: 'transform 0.3s ease',
              animation: 'floatAlt 8s ease-in-out 2s infinite',
              boxShadow: '0 0 24px rgba(245,158,11,0.2)',
            }}
          />

          {/* Small dot cluster */}
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: 4, height: 4,
              borderRadius: '50%',
              background: i % 2 === 0 ? 'rgba(96,165,250,0.4)' : 'rgba(245,158,11,0.4)',
              top: `${20 + i * 12}%`,
              left: `${10 + (i % 3) * 28}%`,
              animation: `float ${4 + i}s ease-in-out ${i * 0.4}s infinite`,
            }} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-shapes { display: none !important; }
          .stat-strip { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .stat-strip { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  )
}
