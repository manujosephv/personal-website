const reviews = [
  {
    quote: "A fluently written and blazingly paced thriller, Manu J's The Artist marks an impressive debut.",
    full: "The darkness engulfing these twisted, scarred men and women isn't external — it's internal, a manifestation of their own sordid psyches.",
    author: 'Dr. Shashi Tharoor',
    role: 'Esteemed Indian Politician, Author & Former Diplomat',
  },
  {
    quote: 'Manu has come up with a surprisingly cohesive narration that seamlessly weaves subdued undertones with graphic murderous violence, rendered with sickeningly artistic hues.',
    full: 'Introduces a promising new writer to the literary scene.',
    author: 'The New Indian Express',
    role: 'National Newspaper',
  },
  {
    quote: 'Manu Joseph exhibits a remarkable command of fiction, weaving intricate details that captivate the reader\'s imagination without overwhelming the story\'s essence.',
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

export default function Author() {
  return (
    <div className="container" style={{ paddingTop: 80, paddingBottom: 80, width: '100%' }}>

      {/* Header */}
      <p className="eyebrow creative">03 — The Storyteller</p>
      <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 56 }}>
        Psychological Fiction.<br />
        <span style={{ color: 'var(--creative-light)', fontStyle: 'italic' }}>The Artist.</span>
      </h2>

      {/* Hero row — book + description */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 56, alignItems: 'start', marginBottom: 72 }} className="author-hero">

        {/* Book cover */}
        <div>
          <div style={{
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0,0,0,0.6), 0 0 40px rgba(245,158,11,0.08)',
            animation: 'float 5s ease-in-out infinite',
            border: '1px solid rgba(245,158,11,0.15)',
            aspectRatio: '2/3',
            background: 'var(--bg-card)',
          }}>
            <img
              src="/book-cover.jpg"
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
            <div className="quote-role">Esteemed Indian Politician, Author & Former Diplomat</div>
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
        marginTop: 56,
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 14, padding: 32,
      }}>
        <span className="pill pill-neutral" style={{ marginBottom: 12 }}>Past Project</span>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 12 }}>Little Pajama Tales</h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20, maxWidth: 640 }}>
          "Cozy Adventures, Big Values." An AI-assisted children's bedtime podcast I created that reached
          families in 20+ countries across 1,000+ downloads. Imaginative 5-minute stories built to enrich
          bedtime routines and spark children's imagination. Now concluded.
        </p>
        <a href="https://shows.acast.com/littlepajamatales" target="_blank" rel="noopener noreferrer"
          className="btn btn-ghost">
          View on Acast ↗
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .author-hero { grid-template-columns: 1fr !important; }
          .author-hero > div:first-child { max-width: 240px; }
          .char-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
