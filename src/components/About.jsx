export default function About() {
  return (
    <div className="container" style={{ paddingTop: 80, paddingBottom: 80, width: '100%' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.5fr',
        gap: 80,
        alignItems: 'center',
      }} className="about-grid">

        {/* Photo column */}
        <div style={{ position: 'relative' }}>
          {/* Glow behind photo */}
          <div style={{
            position: 'absolute', inset: -30, borderRadius: 24,
            background: 'radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{
            position: 'relative',
            borderRadius: 16,
            overflow: 'hidden',
            aspectRatio: '4/5',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
          }}>
            <img
              src="/The_Artist_Manu_J.jpg"
              alt="Manu Joseph"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => {
                e.target.style.display = 'none'
                e.target.parentNode.style.display = 'flex'
                e.target.parentNode.style.alignItems = 'center'
                e.target.parentNode.style.justifyContent = 'center'
                e.target.parentNode.innerHTML = `
                  <div style="text-align:center;padding:40px;color:var(--text-muted)">
                    <div style="font-size:56px;margin-bottom:12px">👤</div>
                    <div style="font-size:11px;font-family:var(--font-mono);letter-spacing:0.1em">portrait.jpg</div>
                  </div>`
              }}
            />
          </div>

          {/* Award badge */}
          <div style={{
            position: 'absolute', bottom: -16, right: -16,
            background: 'var(--bg-card)',
            border: '1px solid rgba(59,130,246,0.25)',
            borderRadius: 10, padding: '10px 16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--tech-light)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              AIM 40 Under 40
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginTop: 2 }}>
              Data Scientist
            </div>
          </div>
        </div>

        {/* Text column */}
        <div>
          <p className="eyebrow" style={{ animation: 'fadeInUp 0.8s ease 0.1s both' }}>01 — About</p>

          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700, lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: 32,
            animation: 'fadeInUp 0.8s ease 0.2s both'
          }}>
            Hi, I'm Manu.<br />
            <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontWeight: 400 }}>
              Builder & Storyteller.
            </span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.8, animation: 'fadeInUp 0.8s ease 0.3s both' }}>
              I'm a <strong style={{ color: 'var(--text-primary)' }}>Principal Data Scientist at Walmart Global Tech India</strong>,
              where I work on machine learning systems at the scale of one of the world's largest retailers.
              Over <strong style={{ color: 'var(--text-primary)' }}>15+</strong> years I've applied AI to Fortune 500 digital transformations — from supply chain
              demand forecasting to deep learning research.
            </p>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.8, animation: 'fadeInUp 0.8s ease 0.4s both' }}>
              In the tech space, I'm known for two things: my work as a deep learning researcher and creator of the{' '}
              <strong style={{ color: 'var(--tech-light)' }}>PyTorch Tabular</strong> framework, and as a <strong style={{ color: 'var(--tech-light)' }}>leading 
              voice in time series forecasting</strong>, having authored a best-selling book on the subject now in its second edition. 
              When the laptop closes, I pick up a pen. My debut psychological thriller{' '}
              <em style={{ color: 'var(--creative-light)', fontWeight: 600 }}>The Artist</em> was praised
              by Dr. Shashi Tharoor as "a fluently written and blazingly paced thriller."
            </p>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.8, animation: 'fadeInUp 0.8s ease 0.5s both' }}>
              Originally from <strong style={{ color: 'var(--text-primary)' }}>Trivandrum, Kerala</strong>,
              now in <strong style={{ color: 'var(--text-primary)' }}>Bangalore</strong>.
              Father. Husband. Perpetually curious.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 32, animation: 'fadeInUp 0.8s ease 0.6s both' }}>
            {[
              { l: 'LinkedIn', h: 'https://www.linkedin.com/in/manujosephv/' },
              { l: 'GitHub',   h: 'https://github.com/manujosephv' },
              { l: 'Blog',     h: 'https://deep-and-shallow.com' },
              { l: 'Medium',   h: 'https://medium.com/@manujosephv' },
            ].map(({ l, h }) => (
              <a key={l} href={h} target="_blank" rel="noopener noreferrer"
                className="btn btn-ghost" style={{ fontSize: 13, padding: '8px 16px' }}>
                {l} ↗
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </div>
  )
}
