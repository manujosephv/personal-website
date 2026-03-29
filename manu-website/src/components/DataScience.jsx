const projects = [
  {
    name: 'PyTorch Tabular',
    tag: '★ Flagship',
    desc: 'A unified framework making deep learning on tabular data as easy as scikit-learn. Built on PyTorch Lightning, works natively with pandas DataFrames. Includes SOTA models: NODE, TabNet, FT-Transformer, GANDALF, GATE.',
    stats: [{ v: '2,000+', l: 'Stars' }, { v: '2K+', l: 'Monthly DLs' }],
    links: [
      { label: 'GitHub', href: 'https://github.com/manujosephv/pytorch_tabular' },
      { label: 'ArXiv', href: 'https://arxiv.org/abs/2104.13638' },
      { label: 'Docs', href: 'https://pytorch-tabular.readthedocs.io' },
    ],
    featured: true,
    color: 'tech',
  },
  {
    name: 'GANDALF',
    tag: 'Novel Architecture',
    desc: 'Gated Adaptive Network for Deep Automated Learning of Features. Introduces the Gated Feature Learning Unit — outperforms XGBoost, SAINT, and FT-Transformers on benchmarks.',
    links: [{ label: 'ArXiv 2207.08548', href: 'https://arxiv.org/abs/2207.08548' }],
    color: 'tech',
  },
  {
    name: 'GATE',
    tag: 'Novel Architecture',
    desc: 'Gated Additive Tree Ensemble — combines tree-based inductive bias with deep learning flexibility for tabular classification and regression tasks.',
    links: [],
    color: 'tech',
  },
  {
    name: 'Deep Renewal Process',
    tag: 'Forecasting',
    desc: 'GluonTS implementation of Intermittent Demand Forecasting with Deep Renewal Processes. Solves sparse/intermittent demand — a core challenge in retail and supply chain.',
    links: [
      { label: 'GitHub', href: 'https://github.com/manujosephv/deeprenewalprocess' },
      { label: 'ArXiv', href: 'https://arxiv.org/abs/1911.10416' },
    ],
    color: 'tech',
  },
]

const papers = [
  { title: 'PyTorch Tabular: A Framework for Deep Learning with Tabular Data', year: '2021', id: '2104.13638' },
  { title: 'GANDALF: Gated Adaptive Network for Deep Automated Learning of Features', year: '2022', id: '2207.08548' },
  { title: 'AskYourDB: Querying Relational Databases with Natural Language', year: '2022', id: '2210.08532' },
  { title: 'LAMA-Net: Unsupervised Domain Adaptation via Latent Alignment for RUL Prediction', year: '2022', id: '2208.08388' },
  { title: 'Intermittent Demand Forecasting with Deep Renewal Processes', year: '2019', id: '1911.10416' },
]

const skills = [
  'PyTorch', 'PyTorch Lightning', 'Time Series Forecasting', 'Tabular Deep Learning',
  'XGBoost / LightGBM', 'NLP & Transformers', 'GluonTS', 'Interpretable ML',
  'Probabilistic Modelling', 'Domain Adaptation', 'scikit-learn', 'Python',
]

export default function DataScience() {
  return (
    <div className="container" style={{ paddingTop: 80, paddingBottom: 80, width: '100%' }}>

      {/* Header */}
      <p className="eyebrow tech">02 — The Builder</p>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 56 }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          Deep Learning &<br />
          <span style={{ color: 'var(--tech-light)' }}>Open Source.</span>
        </h2>
        <div style={{ display: 'flex', gap: 10 }}>
          <a href="https://github.com/manujosephv" target="_blank" rel="noopener noreferrer" className="btn btn-tech">
            GitHub ↗
          </a>
          <a href="https://deep-and-shallow.com" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            Blog ↗
          </a>
        </div>
      </div>

      {/* Featured: PyTorch Tabular */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid rgba(59,130,246,0.2)',
        borderRadius: 16,
        padding: '36px 40px',
        marginBottom: 24,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -60, right: -60,
          width: 240, height: 240, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20, marginBottom: 16 }}>
          <div>
            <span className="pill pill-tech" style={{ marginBottom: 10 }}>★ Flagship Open Source</span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>PyTorch Tabular</h3>
          </div>
          <div style={{ display: 'flex', gap: 28 }}>
            {[{ v: '2,000+', l: 'GitHub Stars' }, { v: '2K+', l: 'Monthly DLs' }].map(s => (
              <div key={s.l} style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--tech-light)', lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 680, marginBottom: 24 }}>
          A unified framework making deep learning on tabular data as easy as calling scikit-learn.
          Built on PyTorch Lightning, works natively with pandas DataFrames. SOTA models — NODE, TabNet,
          FT-Transformer, GANDALF, GATE — all behind one consistent API.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
          {['PyTorch', 'PyTorch Lightning', 'Tabular ML', 'SOTA Models', 'Python'].map(t => (
            <span key={t} className="pill pill-tech">{t}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a href="https://github.com/manujosephv/pytorch_tabular" target="_blank" rel="noopener noreferrer" className="btn btn-tech">GitHub ↗</a>
          <a href="https://arxiv.org/abs/2104.13638" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">ArXiv ↗</a>
          <a href="https://pytorch-tabular.readthedocs.io" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Docs ↗</a>
        </div>
      </div>

      {/* Other projects */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16, marginBottom: 64 }}>
        {projects.slice(1).map(p => (
          <div key={p.name} className="card tech" style={{ padding: 24 }}>
            <span className="pill pill-neutral" style={{ marginBottom: 12 }}>{p.tag}</span>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{p.name}</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>{p.desc}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {p.links.map(l => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                  className="btn btn-ghost" style={{ fontSize: 12, padding: '5px 11px' }}>{l.label} ↗</a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Papers */}
      <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 8 }}>Research Papers</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
        Published on ArXiv at the intersection of deep learning, tabular data, and forecasting.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', marginBottom: 48 }}>
        {papers.map((p, i) => (
          <a key={p.id} href={`https://arxiv.org/abs/${p.id}`} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 20,
              padding: '18px 22px',
              background: i % 2 === 0 ? 'var(--bg-card)' : 'rgba(255,255,255,0.012)',
              borderBottom: i < papers.length - 1 ? '1px solid var(--border)' : 'none',
              textDecoration: 'none', transition: 'background 0.18s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--tech-dim)'}
            onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'var(--bg-card)' : 'rgba(255,255,255,0.012)'}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--tech-light)', minWidth: 32, fontWeight: 600 }}>{p.year}</span>
            <span style={{ flex: 1, color: 'var(--text-primary)', fontSize: 14, fontWeight: 500, lineHeight: 1.4 }}>{p.title}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{p.id}</span>
            <span style={{ color: 'var(--tech-light)', fontSize: 14 }}>↗</span>
          </a>
        ))}
      </div>

      {/* Book + Blog */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 48 }} className="ds-two-col">
        <div className="card tech" style={{ padding: 28 }}>
          <span className="pill pill-tech" style={{ marginBottom: 14 }}>📘 Packt Publishing</span>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>
            Modern Time Series Forecasting with Python
          </h4>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', marginBottom: 12 }}>
            2nd Edition · Co-author: Jeffrey Tackes
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7, marginBottom: 18 }}>
            Classical methods through modern deep learning — LSTMs, Transformers, N-BEATS — with real-world
            applications and interpretability.
          </p>
          <a href="https://www.amazon.com/Modern-Time-Forecasting-Python-industry-ready/dp/1803246804"
            target="_blank" rel="noopener noreferrer" className="btn btn-tech" style={{ fontSize: 13 }}>
            View on Amazon ↗
          </a>
        </div>
        <div className="card tech" style={{ padding: 28 }}>
          <span className="pill pill-neutral" style={{ marginBottom: 14 }}>✍️ Technical Blog</span>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 6 }}>Deep &amp; Shallow</h4>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', marginBottom: 12 }}>
            deep-and-shallow.com
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7, marginBottom: 18 }}>
            In-depth explorations of time series, tabular deep learning, explainability, and probabilistic
            forecasting.
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <a href="https://deep-and-shallow.com" target="_blank" rel="noopener noreferrer" className="btn btn-tech" style={{ fontSize: 13 }}>Blog ↗</a>
            <a href="https://medium.com/@manujosephv" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ fontSize: 13 }}>Medium ↗</a>
          </div>
        </div>
      </div>

      {/* Skills */}
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 16 }}>Skills &amp; Tools</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {skills.map(s => <span key={s} className="pill pill-tech" style={{ fontSize: 12 }}>{s}</span>)}
      </div>

      <style>{`
        @media (max-width: 640px) { .ds-two-col { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
