const talks = [
  {
    event: 'MLDS 2026',
    full: 'Machine Learning Developers Summit',
    org: 'Analytics India Magazine',
    topic: 'Deep Learning for Tabular Data',
    year: '2026',
    upcoming: true,
    link: 'https://mlds.analyticsindiamag.com/speaker/manu-joseph/',
  },
  {
    event: 'MLDS 2025',
    full: 'Machine Learning Developers Summit',
    org: 'Analytics India Magazine',
    topic: 'Time Series Forecasting with PyTorch',
    year: '2025',
    link: 'https://mlds.analyticsindiamag.com/speaker/manu-joseph-2/',
  },
  {
    event: 'PyTorch Tabular Launch',
    full: 'Open Source ML Community',
    org: 'Community / Webinar',
    topic: 'Introducing PyTorch Tabular — Deep Learning on Tabular Data',
    year: '2021',
    link: 'https://github.com/manujosephv/pytorch_tabular',
  },
];

const awards = [
  {
    title: '40 Under 40 Data Scientist',
    org: 'Analytics India Magazine (AIM)',
    icon: '🏆',
    desc: 'Recognised among India\'s most influential data scientists under 40.',
  },
  {
    title: 'Creator of PyTorch Tabular',
    org: 'AIM Data Science Journey Feature',
    icon: '⬡',
    desc: 'Featured in AIM\'s spotlight series as a landmark open-source contribution to the ML ecosystem.',
  },
  {
    title: 'Debut Novel Acclaim',
    org: 'Dr. Shashi Tharoor · The New Indian Express',
    icon: '✦',
    desc: '"A fluently written and blazingly paced thriller" — praised at the highest levels of Indian literary culture.',
  },
];

export default function Speaking() {
  return (
    <section id="speaking" className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <p className="section-eyebrow neutral">On Stage</p>
        <h2 className="section-title">Speaking &amp; Recognition</h2>
        <p className="section-subtitle" style={{ marginBottom: 60 }}>
          Sharing insights on deep learning, tabular data, and time series at India's leading AI conferences.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 60, marginBottom: 80 }}>
          {/* Talks */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 24 }}>
              Talks &amp; Conferences
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {talks.map(t => (
                <a
                  key={t.event}
                  href={t.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    padding: '20px 24px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 14,
                    textDecoration: 'none',
                    transition: 'all 0.25s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--tech-border)'; e.currentTarget.style.boxShadow = '0 4px 20px var(--tech-glow)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--tech-400)' }}>
                        {t.event}
                      </span>
                      {t.upcoming && (
                        <span className="pill pill-tech" style={{ marginLeft: 10, fontSize: 10 }}>Upcoming</span>
                      )}
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>{t.year}</span>
                  </div>
                  <div style={{ color: 'var(--text-primary)', fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
                    {t.topic}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                    {t.full} · {t.org}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 24 }}>
              Awards &amp; Recognition
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {awards.map(a => (
                <div
                  key={a.title}
                  style={{
                    display: 'flex',
                    gap: 16,
                    padding: '20px 24px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 14,
                  }}
                >
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                    flexShrink: 0,
                  }}>
                    {a.icon}
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-primary)', fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{a.title}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 12, marginBottom: 6, fontFamily: 'var(--font-mono)' }}>{a.org}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6 }}>{a.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #speaking .container > div:nth-child(3) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
