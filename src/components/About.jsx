export default function About() {
  return (
    <div className="container" style={{ 
      paddingTop: 'clamp(60px, 10vh, 100px)', 
      paddingBottom: 'clamp(60px, 10vh, 100px)', 
      width: '100%' 
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.5fr)',
        gap: 'clamp(40px, 8vw, 80px)',
        alignItems: 'center',
      }} className="about-grid">

        {/* Photo column */}
        <div className="photo-column" style={{ position: 'relative', maxWidth: 'min(440px, 80vw)', justifySelf: 'center', width: '100%' }}>
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
          <div className="award-badge" style={{
            position: 'absolute', bottom: -12, right: -12,
            background: 'var(--bg-card)',
            border: '1px solid rgba(59,130,246,0.25)',
            borderRadius: 10, padding: 'clamp(8px, 2vw, 10px) clamp(12px, 2.5vw, 16px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            zIndex: 10,
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--tech-light)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              AIM 40 Under 40
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-primary)', marginTop: 2 }}>
              Data Scientist
            </div>
          </div>
        </div>

        {/* Text column */}
        <div>
          <p className="eyebrow" style={{ animation: 'fadeInUp 0.8s ease 0.1s both' }}>01 — About</p>

          <h2 style={{
            fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
            fontWeight: 700, lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: 24,
            animation: 'fadeInUp 0.8s ease 0.2s both'
          }}>
            Hi, I'm Manu.<br />
            <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontWeight: 400 }}>
              Builder & Storyteller.
            </span>
          </h2>

          <div className="about-text-container" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)', color: 'var(--text-secondary)', lineHeight: 1.8, animation: 'fadeInUp 0.8s ease 0.3s both' }}>
              I'm a <strong style={{ color: 'var(--text-primary)' }}>Principal Data Scientist at Walmart Global Tech India</strong>,
              where I work on machine learning systems at the scale of one of the world's largest retailers.
              Over <strong style={{ color: 'var(--text-primary)' }}>15+</strong> years I've applied AI to Fortune 500 digital transformations — from supply chain
              demand forecasting to deep learning research.
            </p>
            <p style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)', color: 'var(--text-secondary)', lineHeight: 1.8, animation: 'fadeInUp 0.8s ease 0.4s both' }}>
              In the tech space, I'm known for two things: my work as a deep learning researcher and creator of the{' '}
              <strong style={{ color: 'var(--tech-light)' }}>PyTorch Tabular</strong> framework, and as a <strong style={{ color: 'var(--tech-light)' }}>leading 
              voice in time series forecasting</strong>, having authored a best-selling book on the subject now in its second edition. 
              When the laptop closes, I pick up a pen. My debut psychological thriller{' '}
              <em style={{ color: 'var(--creative-light)', fontWeight: 600 }}>The Artist</em> was praised
              by Dr. Shashi Tharoor as "a fluently written and blazingly paced thriller."
            </p>
            <p style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)', color: 'var(--text-secondary)', lineHeight: 1.8, animation: 'fadeInUp 0.8s ease 0.5s both' }}>
              Originally from <strong style={{ color: 'var(--text-primary)' }}>Trivandrum, Kerala</strong>,
              now in <strong style={{ color: 'var(--text-primary)' }}>Bangalore</strong>.
              Father. Husband. Perpetually curious.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 32, animation: 'fadeInUp 0.8s ease 0.6s both' }}>
            {[
              { l: 'LinkedIn', h: 'https://www.linkedin.com/in/manujosephv/' },
              { l: 'GitHub',   h: 'https://github.com/manujosephv' },
              { l: 'Blog',     h: 'https://deep-and-shallow.com' },
              { l: 'Medium',   h: 'https://medium.com/@manujosephv' },
            ].map(({ l, h }) => (
              <a key={l} href={h} target="_blank" rel="noopener noreferrer"
                className="btn btn-ghost" style={{ fontSize: 12, padding: '8px 14px' }}>
                {l} ↗
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .about-grid { display: block !important; }
          .photo-column { 
            float: right !important; 
            width: 140px !important; 
            margin-left: 16px !important; 
            margin-bottom: 8px !important;
            shape-outside: inset(0);
          }
          .photo-column .award-badge { display: none !important; }
          .about-grid h2 { font-size: 1.8rem !important; margin-top: 8px !important; margin-bottom: 16px !important; }
          .about-text-container { display: block !important; }
          .about-text-container p { margin-bottom: 16px !important; }
        }
        @media (max-width: 480px) {
          .photo-column { width: 110px !important; margin-left: 12px !important; }
          .about-grid h2 { font-size: 1.6rem !important; }
        }
      `}</style>
    </div>
  )
}
