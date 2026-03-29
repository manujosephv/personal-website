export default function About() {
  return (
    <section id="about" className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.6fr)',
          gap: 80,
          alignItems: 'center',
        }}>
          {/* Photo */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'relative',
              borderRadius: 20,
              overflow: 'hidden',
              aspectRatio: '4/5',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
            }}>
              <img
                src="/portrait.jpg"
                alt="Manu Joseph"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => {
                  e.target.style.display = 'none';
                  e.target.parentNode.style.display = 'flex';
                  e.target.parentNode.style.alignItems = 'center';
                  e.target.parentNode.style.justifyContent = 'center';
                  e.target.parentNode.innerHTML = `
                    <div style="text-align:center;padding:40px;color:var(--text-muted)">
                      <div style="font-size:64px;margin-bottom:16px">👤</div>
                      <div style="font-size:12px;font-family:var(--font-mono);letter-spacing:0.1em">
                        Add portrait.jpg to /public
                      </div>
                    </div>
                  `;
                }}
              />
            </div>
            {/* Decorative glow behind photo */}
            <div style={{
              position: 'absolute',
              inset: -20,
              borderRadius: 30,
              background: 'radial-gradient(ellipse, rgba(96,165,250,0.08) 0%, transparent 70%)',
              zIndex: -1,
            }} />
            {/* Award badge */}
            <div style={{
              position: 'absolute',
              bottom: -16,
              right: -16,
              background: 'linear-gradient(135deg, #0d1117, #1a2235)',
              border: '1px solid var(--tech-border)',
              borderRadius: 14,
              padding: '12px 18px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tech-400)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                AIM 40 Under 40
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginTop: 3 }}>
                Data Scientist
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="section-eyebrow neutral">About</p>
            <h2 className="section-title">Builder. Tinkerer.<br/>
              <span style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>Storyteller.</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                I'm a Principal Data Scientist at <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Walmart Global Tech India</strong>,
                where I work on machine learning systems at the scale of one of the world's largest retailers.
                Over 15+ years I've applied AI and analytics to Fortune 500 digital transformations — from
                supply chain demand forecasting to deep learning research.
              </p>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                I'm probably best known in the ML community as the creator of{' '}
                <span style={{ color: 'var(--tech-300)', fontWeight: 600 }}>PyTorch Tabular</span> — a framework
                that makes deep learning on tabular data feel like scikit-learn. But when the laptop closes,
                I pick up a different kind of tool — a pen. My debut psychological thriller,{' '}
                <span style={{ color: 'var(--creative-300)', fontStyle: 'italic', fontWeight: 600 }}>The Artist</span>,
                was praised by Dr. Shashi Tharoor as <em>"a fluently written and blazingly paced thriller."</em>
              </p>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                Originally from <strong style={{ color: 'var(--text-primary)' }}>Trivandrum, Kerala</strong>,
                now based in <strong style={{ color: 'var(--text-primary)' }}>Bangalore</strong>. Father. Husband.
                Perpetually curious.
              </p>
            </div>

            {/* Key links */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 36 }}>
              <a href="https://www.linkedin.com/in/manujosephv/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: 13 }}>
                LinkedIn ↗
              </a>
              <a href="https://github.com/manujosephv" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: 13 }}>
                GitHub ↗
              </a>
              <a href="https://deep-and-shallow.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: 13 }}>
                Blog ↗
              </a>
              <a href="https://medium.com/@manujosephv" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: 13 }}>
                Medium ↗
              </a>
            </div>
          </div>
        </div>

        {/* Two worlds intro */}
        <div style={{
          marginTop: 100,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 2,
          borderRadius: 20,
          overflow: 'hidden',
          border: '1px solid var(--border)',
        }}>
          {[
            {
              side: 'tech',
              label: 'The Builder',
              icon: '⬡',
              color: 'var(--tech-400)',
              glow: 'var(--tech-glow)',
              border: 'var(--tech-border)',
              heading: 'Data Scientist &\nOpen-Source Creator',
              desc: 'PyTorch Tabular, GANDALF, and 5 ArXiv papers. Deep learning meets real-world tabular data.',
              href: '#data-science',
              cta: 'Explore the Science →',
            },
            {
              side: 'creative',
              label: 'The Storyteller',
              icon: '✦',
              color: 'var(--creative-400)',
              glow: 'var(--creative-glow)',
              border: 'var(--creative-border)',
              heading: 'Psychological\nThriller Author',
              desc: 'The Artist — a dark, cinematic novel where past trauma and psychological obsession collide.',
              href: '#author',
              cta: 'Explore the Fiction →',
            },
          ].map(w => (
            <a key={w.side} href={w.href} style={{
              display: 'block',
              padding: '48px 40px',
              background: 'var(--bg-card)',
              transition: 'background 0.3s',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = w.side === 'tech'
                ? 'rgba(59,130,246,0.06)'
                : 'rgba(245,158,11,0.06)';
            }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-card)'; }}
            >
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '4px 12px',
                background: w.glow,
                border: `1px solid ${w.border}`,
                borderRadius: 999,
                marginBottom: 20,
              }}>
                <span style={{ color: w.color }}>{w.icon}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: w.color, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  {w.label}
                </span>
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1.2,
                whiteSpace: 'pre-line',
                marginBottom: 16,
              }}>
                {w.heading}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
                {w.desc}
              </p>
              <span style={{ color: w.color, fontSize: 14, fontWeight: 600 }}>{w.cta}</span>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .container > div:first-child {
            grid-template-columns: 1fr !important;
          }
          #about .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
