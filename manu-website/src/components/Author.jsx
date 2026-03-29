const reviews = [
  {
    quote: 'A fluently written and blazingly paced thriller, Manu J\'s The Artist marks an impressive debut.',
    full: 'As the characters of Manu J\'s audacious psychological thriller blaze a bloody trail, the reader realises a searing fact: in this bleakest of bleak worlds, the darkness engulfing these twisted, scarred men and women isn\'t external — it\'s internal, a manifestation of their own sordid psyches.',
    author: 'Dr. Shashi Tharoor',
    role: 'Esteemed Indian Politician, Accomplished Author & Former Diplomat',
  },
  {
    quote: 'Manu has come up with a surprisingly cohesive narration that seamlessly weaves subdued undertones with graphic murderous violence, rendered with sickeningly artistic hues.',
    full: 'Published by Paper Towns, it offers a solid read for genre enthusiasts and introduces a promising new writer to the literary scene.',
    author: 'The New Indian Express',
    role: 'National Newspaper',
  },
  {
    quote: 'Manu Joseph exhibits a remarkable command of fiction, weaving intricate details that captivate the reader\'s imagination without overwhelming the story\'s essence.',
    full: 'The character of Manas reflects a profound exploration of the human self, echoing the tragic visions found in the Mahabharata and Greek tragedies.',
    author: 'Prof. N. Manu Chakravarthy',
    role: 'Writer, Film Critic & Cultural Theorist',
  },
];

const characters = [
  {
    name: 'Alex',
    alias: 'The Artist',
    desc: 'A serial killer with a flair for the dramatic, turning each crime into a dark piece of art. An enigmatic predator camouflaged within urban chaos — calm, calculating, and utterly controlled.',
    color: 'var(--creative-400)',
  },
  {
    name: 'Manas',
    alias: 'The Father',
    desc: 'A family man living what appears to be an ideal life, until a buried secret resurfaces. Thrust into a nightmare, he races against time and fate to protect what he holds dearest.',
    color: 'var(--tech-400)',
  },
  {
    name: 'Nasir Ali Khan',
    alias: 'The Hunter',
    desc: 'An elite officer, one of the very few sent to the FBI for training in violent crimes. Methodical and relentless — four years on the Artist\'s trail with nothing to show for it. Until now.',
    color: '#a78bfa',
  },
];

const themes = ['Serial Killer', 'Police Procedural', 'Dark Past', 'Family', 'Internal Struggle', 'Multiple POVs', 'Cat & Mouse'];

export default function Author() {
  return (
    <section id="author" className="section" style={{
      background: 'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-void) 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Right accent bar */}
      <div style={{
        position: 'absolute',
        right: 0,
        top: '15%',
        bottom: '15%',
        width: 3,
        background: 'linear-gradient(to bottom, transparent, var(--creative-500), transparent)',
      }} />

      {/* Background texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(245,158,11,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <p className="section-eyebrow creative">The Storyteller</p>
        <h2 className="section-title">
          Psychological Fiction.<br />
          <span className="glow-creative">The Artist.</span>
        </h2>

        {/* Hero row — cover + description */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: 60,
          alignItems: 'start',
          marginBottom: 80,
        }}>
          {/* Book cover */}
          <div>
            <div style={{
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 60px var(--creative-glow-strong)',
              animation: 'float 5s ease-in-out infinite',
              border: '1px solid var(--creative-border)',
              aspectRatio: '2/3',
              background: 'var(--bg-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img
                src="/book-cover.jpg"
                alt="The Artist by Manu J"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => {
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML = `
                    <div style="width:100%;height:100%;background:linear-gradient(160deg,#1a0a00,#0a0005);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;text-align:center">
                      <div style="font-size:11px;font-family:var(--font-mono);letter-spacing:0.2em;color:var(--creative-400);text-transform:uppercase;margin-bottom:20px">A Psychological Thriller</div>
                      <div style="font-family:var(--font-display);font-size:2.8rem;font-weight:900;color:white;line-height:1;margin-bottom:16px">THE<br/>ARTIST</div>
                      <div style="width:40px;height:2px;background:var(--creative-500);margin:0 auto 16px"></div>
                      <div style="font-family:var(--font-display);font-style:italic;font-size:1.1rem;color:var(--creative-400)">Manu J</div>
                      <div style="font-size:10px;color:var(--text-muted);margin-top:32px;font-family:var(--font-mono)">Add book-cover.jpg to /public</div>
                    </div>
                  `;
                }}
              />
            </div>

            {/* Buy links */}
            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href="https://linktr.ee/the_artist_novel" target="_blank" rel="noopener noreferrer" className="btn btn-creative" style={{ justifyContent: 'center', fontSize: 14 }}>
                Buy the Book ↗
              </a>
              <a href="https://www.instagram.com/author_manu_j/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ justifyContent: 'center', fontSize: 14 }}>
                @author_manu_j ↗
              </a>
            </div>
          </div>

          {/* Right side */}
          <div>
            <div style={{ marginBottom: 28 }}>
              <span className="pill pill-creative" style={{ marginRight: 8 }}>Paper Towns · 2024</span>
              <span className="pill pill-neutral">Debut Novel</span>
            </div>

            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: 28 }}>
              In the shadowed alleys of Trivandrum to the bustling streets of Delhi,{' '}
              <em style={{ color: 'var(--creative-300)', fontFamily: 'var(--font-display)' }}>The Artist</em>{' '}
              unravels a gripping narrative through the lives of three distinct characters — a serial killer,
              a desperate father, and a relentless investigator — each entangled in a web of mystery and darkness.
            </p>

            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: 36 }}>
              Where the lines between right and wrong blur, and the pursuit of truth leads down a path
              fraught with peril. This is not just a thriller — it's an exploration of the human condition,
              a journey into the heart of darkness.
            </p>

            {/* Theme pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
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
        <div style={{ marginBottom: 80 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
            Three Voices. One Dark Truth.
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 32 }}>
            The novel weaves between three distinct perspectives, each revealing a different face of obsession.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {characters.map(c => (
              <div key={c.name} style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderTop: `3px solid ${c.color}`,
                borderRadius: 16,
                padding: '28px 24px',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = c.color; e.currentTarget.style.boxShadow = `0 8px 30px rgba(0,0,0,0.3)`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.borderTopColor = c.color; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: c.color, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
                  {c.alias}
                </div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>
                  {c.name}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Excerpt */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--creative-border)',
          borderRadius: 20,
          padding: '40px 44px',
          marginBottom: 80,
          boxShadow: '0 0 60px var(--creative-glow)',
        }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--creative-400)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 20 }}>
            ✦ Excerpt — Chapter One
          </p>
          <blockquote style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            lineHeight: 1.85,
            color: 'var(--text-primary)',
            borderLeft: '3px solid var(--creative-500)',
            paddingLeft: 28,
          }}>
            "Alex drummed his fingers on the steering wheel of his blue Alto, idling on the side of the street.
            The streetlamp cast its amber light, bathing everyone and everything in gold. A bustling crowd,
            painted in honey-toned light, rushed past the window in its usual hurry to reach places. No one
            savoured the journey anymore; it was always a mad rush to reach somewhere, and fast. Little ants
            scurrying to make ends meet. Blind cows meandering through life without purpose."
          </blockquote>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 20, fontFamily: 'var(--font-mono)' }}>
            — The Artist, Manu J
          </p>
        </div>

        {/* All reviews */}
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 32 }}>
            Critical Acclaim
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {reviews.map(r => (
              <div key={r.author} className="quote-block">
                <p className="quote-text">"{r.quote}"</p>
                {r.full && <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, marginBottom: 12, fontStyle: 'italic' }}>
                  {r.full}
                </p>}
                <div className="quote-author">{r.author}</div>
                <div className="quote-role">{r.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #author .container > div:nth-child(3) {
            grid-template-columns: 1fr !important;
          }
          #author .container > div:nth-child(3) > div:first-child {
            max-width: 260px;
            margin: 0 auto;
          }
          #author .container > div:nth-child(4) > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
