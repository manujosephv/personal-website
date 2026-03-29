const media = [
  {
    title: 'DPhi Expert Talks',
    platform: 'YouTube',
    topic: 'Interview as a self-taught Data Scientist and creator of PyTorch Tabular.',
    year: '2022',
    link: 'https://www.youtube.com/watch?v=FSE3TyBnH5g',
    type: 'Podcast'
  },
  {
    title: 'Packt Partnerships',
    platform: 'Packt Article',
    topic: 'Discussing Machine Learning, Time Series Forecasting, and authoring my book.',
    year: '2023',
    link: 'https://partnerships.packt.com/interview-with-manu-joseph/',
    type: 'Interview'
  }
];

const talks = [
  {
    event: 'Packt Workshop',
    full: 'Time Series Forecasting in Python',
    org: 'Packt Hands-on',
    topic: 'Modern Time Series Forecasting with Python',
    year: '2026',
    upcoming: true,
    link: 'https://www.eventbrite.com/e/time-series-forecasting-in-python-end-to-end-practice-tickets-1985809805585?aff=ma',
  },
  {
    event: 'MLDS 2023',
    full: 'Machine Learning Developers Summit',
    org: 'Analytics India Magazine',
    topic: 'Invited Speaker',
    year: '2023',
    link: 'https://mlds.analyticsindiamag.com/speaker/manu-joseph/',
  },
  {
    event: 'DPhi Session',
    full: 'Community Webinar',
    org: 'DPhi',
    topic: 'Zero-Shot Text Classification (NLP)',
    year: '2022',
    link: 'https://www.youtube.com/watch?v=TlpqrI2Pdw0',
  },
]

const awards = [
  {
    title: '40 Under 40 Data Scientists',
    year: '2024',
    org: 'Analytics India Magazine',
    desc: 'Recognised among India\'s most influential data scientists under 40.',
    color: 'var(--tech-light)',
    link: 'https://analyticsindiamag.com/ai-highlights/the-40-under-40-data-scientists-awards-2024-meet-the-winners'
  },
  {
    title: 'Data Science Journey Feature',
    year: '2022',
    org: 'Analytics India Magazine',
    desc: 'Spotlight article on PyTorch Tabular as a landmark open-source project.',
    color: 'var(--tech-light)',
    link: 'https://analyticsindiamag.com/ai-features/data-science-journey-of-manu-joseph-the-creator-of-pytorch-tabular'
  },
  {
    title: 'Critical Literary Acclaim',
    year: '2024',
    org: 'Dr. Shashi Tharoor · The New Indian Express',
    desc: '"A fluently written and blazingly paced thriller" — among the highest endorsements for a debut thriller in Indian publishing.',
    color: 'var(--creative-light)',
  },
]

export default function Speaking() {
  return (
    <div className="container" style={{ paddingTop: 80, paddingBottom: 80, width: '100%' }}>

      <p className="eyebrow" style={{ animation: 'fadeInUp 0.8s ease 0.1s both' }}>04 — Presence</p>
      <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 16, animation: 'fadeInUp 0.8s ease 0.2s both' }}>
        Media &amp; Recognition.
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: 56, maxWidth: 500, animation: 'fadeInUp 0.8s ease 0.3s both' }}>
        Podcasts, interviews, talks, and the accolades picked up along the way.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 56 }} className="speaking-grid">

        {/* Left Column: Media & Talks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48, animation: 'fadeInUp 0.8s ease 0.4s both' }}>
          
          {/* Media Section */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 20, fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
              MEDIA &amp; INTERVIEWS
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {media.map(m => (
                <a key={m.title} href={m.link} target="_blank" rel="noopener noreferrer"
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
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{m.title}</span>
                      <span className="pill pill-tech" style={{ fontSize: 9, background: 'var(--bg-highlight)', borderColor: 'var(--border-mid)', color: 'var(--text-secondary)' }}>{m.type}</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>{m.year}</span>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 13, fontWeight: 500, marginBottom: 3 }}>{m.topic}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>{m.platform}</div>
                </a>
              ))}
            </div>
          </div>

          {/* Talks Section */}
          <div>
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

        </div>

        {/* Right Column: Awards */}
        <div style={{ animation: 'fadeInUp 0.8s ease 0.5s both' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 20, fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
            AWARDS &amp; RECOGNITION
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)' }}>
            {awards.map((a, i) => {
              const content = (
                <div style={{
                  padding: '24px 22px',
                  background: 'var(--bg-card)',
                  borderBottom: i < awards.length - 1 ? '1px solid var(--border)' : 'none',
                  borderLeft: `3px solid ${a.color}`,
                  transition: 'background 0.2s',
                }}
                className={a.link ? "award-card-hover" : ""}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{a.title} {a.link && <span style={{fontSize: 12, opacity: 0.5}}>↗</span>}</div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>{a.year}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', marginBottom: 12, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{a.org}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.6 }}>{a.desc}</div>
                </div>
              );

              return a.link ? (
                <a key={a.title} href={a.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
                  {content}
                </a>
              ) : (
                <div key={a.title}>
                  {content}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style>{`
        .award-card-hover:hover { background: rgba(255,255,255,0.02) !important; }
        @media (max-width: 768px) {
          .speaking-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </div>
  )
}
