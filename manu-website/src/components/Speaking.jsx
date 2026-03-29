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
    topic: 'Time Series Forecasting',
    year: '2025',
    link: 'https://mlds.analyticsindiamag.com/speaker/manu-joseph-2/',
  },
  {
    event: 'PyTorch Tabular Launch',
    full: 'Open Source ML Community',
    org: 'Community Webinar',
    topic: 'Introducing PyTorch Tabular — Deep Learning on Tabular Data',
    year: '2021',
    link: 'https://github.com/manujosephv/pytorch_tabular',
  },
]

const awards = [
  {
    title: '40 Under 40 Data Scientist',
    org: 'Analytics India Magazine',
    desc: 'Recognised among India\'s most influential data scientists under 40.',
    color: 'var(--tech-light)',
  },
  {
    title: 'PyTorch Tabular Feature',
    org: 'AIM Data Science Journey',
    desc: 'Spotlight as a landmark open-source contribution to the global ML ecosystem.',
    color: 'var(--tech-light)',
  },
  {
    title: 'Critical Literary Acclaim',
    org: 'Dr. Shashi Tharoor · The New Indian Express',
    desc: '"A fluently written and blazingly paced thriller" — among the highest endorsements for a debut thriller in Indian publishing.',
    color: 'var(--creative-light)',
  },
]

export default function Speaking() {
  return (
    <div className="container" style={{ paddingTop: 80, paddingBottom: 80, width: '100%' }}>

      <p className="eyebrow" style={{ animation: 'fadeInUp 0.8s ease 0.1s both' }}>04 — Recognition</p>
      <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 16, animation: 'fadeInUp 0.8s ease 0.2s both' }}>
        Speaking &amp; Awards.
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: 56, maxWidth: 500, animation: 'fadeInUp 0.8s ease 0.3s both' }}>
        Sharing insights on deep learning and time series at India's leading AI conferences.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 56 }} className="speaking-grid">

        {/* Talks */}
        <div style={{ animation: 'fadeInUp 0.8s ease 0.4s both' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 20, fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
            TALKS &amp; CONFERENCES
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {talks.map(t => (
              <a key={t.event} href={t.link} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'block', padding: '18px 20px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  textDecoration: 'none', transition: 'border-color 0.22s, box-shadow 0.22s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(59,130,246,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--tech-light)' }}>{t.event}</span>
                    {t.upcoming && <span className="pill pill-tech" style={{ fontSize: 9 }}>Upcoming</span>}
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>{t.year}</span>
                </div>
                <div style={{ color: 'var(--text-primary)', fontSize: 14, fontWeight: 500, marginBottom: 3 }}>{t.topic}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>{t.full} · {t.org}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div style={{ animation: 'fadeInUp 0.8s ease 0.5s both' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 20, fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
            AWARDS &amp; RECOGNITION
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)' }}>
            {awards.map((a, i) => (
              <div key={a.title} style={{
                padding: '20px 22px',
                background: 'var(--bg-card)',
                borderBottom: i < awards.length - 1 ? '1px solid var(--border)' : 'none',
                borderLeft: `3px solid ${a.color}`,
              }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>{a.title}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', marginBottom: 8, letterSpacing: '0.04em' }}>{a.org}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6 }}>{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .speaking-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  )
}
