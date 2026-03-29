const reviews = [
  {
    quote: "A fluently written and blazingly paced thriller, Manu J's The Artist marks an impressive debut.",
    full: "As the characters blaze a bloody trail, the reader realises a searing fact: the darkness engulfing these twisted, scarred men and women isn't external — it's internal, a manifestation of their own sordid psyches.",
    author: 'Dr. Shashi Tharoor',
    role: 'Esteemed Indian Politician, Author & Former Diplomat',
  },
  {
    quote: 'For a debutant, Manu has come up with a surprisingly cohesive narration that seamlessly weaves subdued undertones with graphic murderous violence, rendered with sickeningly artistic hues.',
    full: 'Introduces a promising new writer to the literary scene.',
    author: 'The New Indian Express',
    role: 'National Newspaper',
  },
  {
    quote: 'Manu Joseph exhibits a remarkable command of fiction, weaving intricate details that captivate the reader\'s imagination without overwhelming the story\'s essence. His deep understanding of the human psyche is remarkable.',
    full: 'The character of Manas reflects a profound exploration of the human self, echoing the tragic visions found in the Mahabharata and Greek tragedies.',
    author: 'Prof. N. Manu Chakravarthy',
    role: 'Writer, Film Critic & Cultural Theorist',
  },
]

const characters = [
  {
    name: 'Alex',
    alias: 'The Artist',
    desc: 'A serial killer with a flair for the dramatic — calm, calculating, turning each crime into a dark piece of art.',
    color: 'var(--creative-light)',
    border: 'rgba(245,158,11,0.3)',
  },
  {
    name: 'Manas',
    alias: 'The Father',
    desc: 'A family man living an ideal life — until a buried secret resurfaces. Racing against time to protect what he holds dearest.',
    color: 'var(--tech-light)',
    border: 'rgba(59,130,246,0.3)',
  },
  {
    name: 'Nasir Ali Khan',
    alias: 'The Hunter',
    desc: 'An elite officer trained by the FBI. Methodical, relentless — four years on the Artist\'s trail. Until now.',
    color: '#a78bfa',
    border: 'rgba(167,139,250,0.3)',
  },
]

const themes = ['Serial Killer', 'Police Procedural', 'Dark Past', 'Family', 'Internal Struggle', 'Multiple POVs', 'Cat & Mouse']

const podcastLinks = [
  { label: 'Spotify', href: 'https://open.spotify.com/show/3ydiII0tUIgJcTEw7Di5WX', icon: '🎵' },
  { label: 'Apple Podcasts', href: 'https://podcasts.apple.com/gb/podcast/little-pajama-tales/id1707720797', icon: '🎙️' },
  { label: 'Amazon Music', href: 'https://www.amazon.in/Little-Pajama-Tales/dp/B0CJ591Q5W', icon: '🛒' },
  { label: 'Acast', href: 'https://feeds.acast.com/public/shows/littlepajamatales', icon: '📻' },
]

export default function Author() {
  return (
    <div className="container" style={{ paddingTop: 80, paddingBottom: 80, width: '100%' }}>

      {/* ── Hero Intro ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, alignItems: 'center', marginBottom: 72 }} className="author-hero-top">
        
        {/* Left — Copy + Headshot */}
        <div>
          <p className="eyebrow creative" style={{ marginBottom: 16 }}>The Storyteller</p>
          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.1,
            letterSpacing: '-0.03em', marginBottom: 32,
          }}>
            When the laptop closes,{' '}
            <span style={{ color: 'var(--creative-light)', fontStyle: 'italic' }}>I pick up a pen.</span>
          </h1>
          
          <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', marginBottom: 24 }} className="story-intro-flex">
            {/* Real Headshot */}
            <div style={{ 
              flexShrink: 0, width: 120, height: 120, borderRadius: '50%', overflow: 'hidden', 
              border: '2px solid var(--creative-light)', boxShadow: '0 8px 32px rgba(245,158,11,0.15)' 
            }}>
              <img src="/The_Artist_Manu_J.jpg" alt="Manu Joseph" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.85, maxWidth: 680, flex: 1 }}>
              Writing under the pen name <strong style={{ color: 'var(--text-primary)' }}>Manu J</strong>, I published
              my debut psychological thriller <em style={{ color: 'var(--creative-light)' }}>The Artist</em> in 2024.
              Somewhere between Python and prose, I found that the best stories — like the best models — are built on a 
              deep understanding of people.
            </p>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.85, maxWidth: 680 }}>
            I don't write to escape the world of data. I write because the questions that fascinate me most —
            about motive, morality, and the stories we tell ourselves — are best explored in fiction.
          </p>
        </div>

        {/* Right — Mind Map Visual */}
        <div style={{ 
          position: 'relative', 
          aspectRatio: '1', 
          background: 'rgba(245, 158, 11, 0.03)', 
          border: '1px solid rgba(245, 158, 11, 0.1)', 
          borderRadius: 24,
          padding: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          {/* Subtle Glow Background */}
          <div style={{ 
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '150%', height: '150%', background: 'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          {/* Inline SVG Mind Map */}
          <svg viewBox="0 0 400 400" width="100%" height="100%" style={{ position: 'relative', zIndex: 1 }}>
            {/* Connection Lines (Paths) */}
            <g stroke="rgba(245,158,11,0.2)" strokeWidth="1" fill="none">
              <path d="M200,200 L100,120" /> {/* Center to Alex */}
              <path d="M200,200 L300,120" /> {/* Center to Nasir */}
              <path d="M200,200 L200,320" /> {/* Center to Manas */}
              <path d="M100,120 L50,180" />  {/* Alex to Obsession */}
              <path d="M100,120 L150,60" />  {/* Alex to Art */}
              <path d="M300,120 L350,180" /> {/* Nasir to Justice */}
              <path d="M300,120 L250,60" />  {/* Nasir to The Hunt */}
              <path d="M200,320 L120,350" /> {/* Manas to Family */}
              <path d="M200,320 L280,350" /> {/* Manas to Secret */}
              {/* Crossed Connections */}
              <path d="M50,180 Q200,150 350,180" strokeDasharray="4 4" stroke="rgba(245,158,11,0.1)" />
            </g>

            {/* Nodes */}
            {/* Center Node: The Artist */}
            <circle cx="200" cy="200" r="14" fill="var(--creative)" filter="blur(2px)" />
            <circle cx="200" cy="200" r="8" fill="white" />
            <text x="200" y="235" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)" fontFamily="var(--font-mono)" letterSpacing="0.05em">THE ARTIST</text>

            {/* Alex Node */}
            <circle cx="100" cy="120" r="6" fill="var(--creative-light)" />
            <text x="100" y="110" textAnchor="middle" fontSize="11" fill="var(--creative-light)" fontFamily="var(--font-mono)">ALEX</text>
            <text x="50" y="195" textAnchor="middle" fontSize="9" fill="var(--text-muted)" fontFamily="var(--font-mono)">OBSESSION</text>
            <text x="150" y="50" textAnchor="middle" fontSize="9" fill="var(--text-muted)" fontFamily="var(--font-mono)">ART</text>

            {/* Nasir Node */}
            <circle cx="300" cy="120" r="6" fill="#a78bfa" />
            <text x="300" y="110" textAnchor="middle" fontSize="11" fill="#a78bfa" fontFamily="var(--font-mono)">NASIR</text>
            <text x="350" y="195" textAnchor="middle" fontSize="9" fill="var(--text-muted)" fontFamily="var(--font-mono)">JUSTICE</text>
            <text x="250" y="50" textAnchor="middle" fontSize="9" fill="var(--text-muted)" fontFamily="var(--font-mono)">THE HUNT</text>

            {/* Manas Node */}
            <circle cx="200" cy="320" r="6" fill="var(--tech-light)" />
            <text x="200" y="340" textAnchor="middle" fontSize="11" fill="var(--tech-light)" fontFamily="var(--font-mono)">MANAS</text>
            <text x="120" y="365" textAnchor="middle" fontSize="9" fill="var(--text-muted)" fontFamily="var(--font-mono)">FAMILY</text>
            <text x="280" y="365" textAnchor="middle" fontSize="9" fill="var(--text-muted)" fontFamily="var(--font-mono)">SECRET</text>
          </svg>

          {/* Floating UI Badges */}
          <div style={{ position: 'absolute', top: 20, left: 20, fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--creative-light)', opacity: 0.5 }}>AUTHOR'S BRAIN</div>
          <div style={{ position: 'absolute', bottom: 20, right: 20, fontSize: 10, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.2)' }}>SYNAPSE_LINK_STABLE</div>
        </div>
      </div>

      {/* ── Book Hero ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 56, alignItems: 'start', marginBottom: 72 }} className="author-hero">

        {/* Book cover */}
        <div>
          <div style={{
            borderRadius: 12, overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0,0,0,0.6), 0 0 40px rgba(245,158,11,0.08)',
            animation: 'float 5s ease-in-out infinite',
            border: '1px solid rgba(245,158,11,0.15)',
            aspectRatio: '2/3',
            background: 'var(--bg-card)',
          }}>
            <img
              src="/book-cover.png"
              alt="The Artist by Manu J"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => {
                e.target.style.display = 'none'
                e.target.parentNode.innerHTML = `
                  <div style="width:100%;height:100%;background:linear-gradient(160deg,#1a0a00,#0a0005);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:28px;text-align:center">
                    <div style="font-size:10px;font-family:var(--font-mono);letter-spacing:0.2em;color:var(--creative-light);text-transform:uppercase;margin-bottom:16px">A Psychological Thriller</div>
                    <div style="font-family:var(--font-sans);font-size:2.4rem;font-weight:900;color:white;line-height:1;margin-bottom:12px">THE<br/>ARTIST</div>
                    <div style="width:32px;height:2px;background:var(--creative);margin:0 auto 12px"></div>
                    <div style="font-style:italic;font-size:1rem;color:var(--creative-light)">Manu J</div>
                  </div>`
              }}
            />
          </div>
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href="https://linktr.ee/the_artist_novel" target="_blank" rel="noopener noreferrer"
              className="btn btn-creative" style={{ justifyContent: 'center', fontSize: 14 }}>
              Buy the Book ↗
            </a>
            <a href="https://www.amazon.in/stores/Manu-Joseph/author/B0BL85MBVW" target="_blank" rel="noopener noreferrer"
              className="btn btn-ghost" style={{ justifyContent: 'center', fontSize: 14 }}>
              Amazon India ↗
            </a>
            <a href="https://www.instagram.com/author_manu_j/" target="_blank" rel="noopener noreferrer"
              className="btn btn-ghost" style={{ justifyContent: 'center', fontSize: 14 }}>
              @author_manu_j ↗
            </a>
          </div>
        </div>

        {/* Right column */}
        <div>
          <div style={{ marginBottom: 24 }}>
            <span className="pill pill-creative" style={{ marginRight: 8 }}>Paper Towns · 2024</span>
            <span className="pill pill-neutral">Debut Novel</span>
            <span className="pill pill-neutral" style={{ marginLeft: 8 }}>Psychological Thriller</span>
          </div>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: 20 }}>
            Set between the shadowed alleys of <em>Trivandrum</em> and the bustling streets of <em>Delhi</em>,{' '}
            <strong style={{ color: 'var(--creative-light)', fontStyle: 'italic' }}>The Artist</strong> unravels
            through three distinct voices — a serial killer, a desperate father, and a relentless investigator —
            each entangled in a web of mystery and darkness.
          </p>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: 28 }}>
            Where the lines between right and wrong blur, and the pursuit of truth leads down a path fraught
            with peril. This is not just a thriller — it's an exploration of the human condition.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 32 }}>
            {themes.map(t => <span key={t} className="pill pill-creative">{t}</span>)}
          </div>

          {/* Shashi Tharoor pull quote */}
          <div className="quote-block">
            <p className="quote-text">
              "A fluently written and blazingly paced thriller, Manu J's The Artist marks an impressive debut."
            </p>
            <div className="quote-author">Dr. Shashi Tharoor</div>
            <div className="quote-role">Esteemed Indian Politician, Author &amp; Former Diplomat</div>
          </div>
        </div>
      </div>

      {/* Characters */}
      <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 8 }}>Three Voices. One Dark Truth.</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 28 }}>
        The novel weaves between three perspectives, each revealing a different face of obsession.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 56 }} className="char-grid">
        {characters.map(c => (
          <div key={c.name} style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderTop: `3px solid ${c.color}`,
            borderRadius: 12, padding: '24px 20px',
            transition: 'border-color 0.25s, box-shadow 0.25s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.borderTopColor = c.color; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: c.color, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>{c.alias}</div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>{c.name}</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7 }}>{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Opening excerpt */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid rgba(245,158,11,0.15)',
        borderRadius: 14, padding: '32px 36px', marginBottom: 56,
        boxShadow: '0 0 40px rgba(245,158,11,0.05)',
      }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--creative-light)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>
          ✦ Excerpt — Chapter One
        </p>
        <blockquote style={{
          fontStyle: 'italic',
          fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
          lineHeight: 1.9,
          color: 'var(--text-primary)',
          borderLeft: '3px solid var(--creative)',
          paddingLeft: 24,
        }}>
          "Alex drummed his fingers on the steering wheel of his blue Alto, idling on the side of the street.
          The streetlamp cast its amber light, bathing everyone and everything in gold. A bustling crowd,
          painted in honey-toned light, rushed past the window in its usual hurry to reach places. No one
          savoured the journey anymore; it was always a mad rush to reach somewhere, and fast. Little ants
          scurrying to make ends meet. Blind cows meandering through life without purpose."
        </blockquote>
        <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 16, fontFamily: 'var(--font-mono)' }}>
          — The Artist, Manu J
        </p>
      </div>

      {/* All reviews */}
      <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 24 }}>Critical Acclaim</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 64 }}>
        {reviews.map(r => (
          <div key={r.author} className="quote-block">
            <p className="quote-text">"{r.quote}"</p>
            {r.full && <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7, marginBottom: 12, fontStyle: 'italic' }}>{r.full}</p>}
            <div className="quote-author">{r.author}</div>
            <div className="quote-role">{r.role}</div>
          </div>
        ))}
      </div>

      {/* Little Pajama Tales */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 14, padding: '32px 36px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
          <span className="pill pill-neutral">🎙️ Past Project</span>
          <span className="pill pill-neutral" style={{ fontSize: 11, color: 'var(--text-muted)' }}>Concluded</span>
        </div>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 6 }}>Little Pajama Tales</h3>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--creative-light)', fontStyle: 'italic', marginBottom: 16 }}>
          "Cozy Adventures, Big Values."
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
          {[{ v: '1,000+', l: 'Downloads' }, { v: '20+', l: 'Countries' }].map(s => (
            <div key={s.l} style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{s.v}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.l}</span>
            </div>
          ))}
        </div>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 24, maxWidth: 640 }}>
          An AI-assisted children's bedtime podcast I created — imaginative 5-minute fairy tales for young dreamers,
          designed to enrich bedtime routines and impart values like honesty, courage, and kindness.
          Reached families across 20+ countries before concluding.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {podcastLinks.map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
              className="btn btn-ghost" style={{ fontSize: 13 }}>
              {l.icon} {l.label} ↗
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .author-hero-top { grid-template-columns: 1fr !important; gap: 40px !important; }
          .story-intro-flex { flex-direction: column !important; gap: 24px !important; align-items: center !important; text-align: center !important; }
          .author-hero { grid-template-columns: 1fr !important; gap: 40px !important; }
          .author-hero > div:first-child { max-width: 280px; margin: 0 auto; }
          .char-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
