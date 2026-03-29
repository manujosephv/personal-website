const projects = [
  {
    name: 'PyTorch Tabular',
    tag: 'Flagship Framework',
    desc: 'A unified framework that makes deep learning on tabular data as simple as scikit-learn. Built on PyTorch Lightning, works directly with pandas DataFrames. Includes SOTA models: NODE, TabNet, FT-Transformer, GANDALF, GATE.',
    stats: [
      { value: '2K+', label: 'GitHub Stars' },
      { value: '2K+', label: 'Monthly Downloads' },
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/manujosephv/pytorch_tabular' },
      { label: 'ArXiv', href: 'https://arxiv.org/abs/2104.13638' },
    ],
    featured: true,
  },
  {
    name: 'GANDALF',
    tag: 'Novel Architecture',
    desc: 'Gated Adaptive Network for Deep Automated Learning of Features. Introduces the Gated Feature Learning Unit — outperforms/matches XGBoost, SAINT, and FT-Transformers on standard benchmarks.',
    links: [{ label: 'ArXiv 2207.08548', href: 'https://arxiv.org/abs/2207.08548' }],
  },
  {
    name: 'GATE',
    tag: 'Novel Architecture',
    desc: 'Gated Additive Tree Ensemble — combines tree-based inductive bias with deep learning flexibility for tabular classification and regression tasks.',
    links: [],
  },
  {
    name: 'Deep Renewal Process',
    tag: 'Forecasting',
    desc: 'GluonTS implementation of Intermittent Demand Forecasting with Deep Renewal Processes. Solves sparse/intermittent demand — a core challenge in retail and supply chain.',
    links: [
      { label: 'GitHub', href: 'https://github.com/manujosephv/deeprenewalprocess' },
      { label: 'ArXiv', href: 'https://arxiv.org/abs/1911.10416' },
    ],
  },
];

const papers = [
  { title: 'PyTorch Tabular: A Framework for Deep Learning with Tabular Data', year: '2021', id: '2104.13638' },
  { title: 'GANDALF: Gated Adaptive Network for Deep Automated Learning of Features', year: '2022', id: '2207.08548' },
  { title: 'AskYourDB: Querying Relational Databases with Natural Language', year: '2022', id: '2210.08532' },
  { title: 'LAMA-Net: Unsupervised Domain Adaptation via Latent Alignment for RUL Prediction', year: '2022', id: '2208.08388' },
  { title: 'Intermittent Demand Forecasting with Deep Renewal Processes', year: '2019', id: '1911.10416' },
];

const skills = [
  'PyTorch', 'PyTorch Lightning', 'Time Series Forecasting', 'Tabular Deep Learning',
  'XGBoost / LightGBM', 'NLP', 'GluonTS', 'Interpretable ML',
  'Probabilistic Modelling', 'Domain Adaptation', 'scikit-learn', 'Pandas',
];

export default function DataScience() {
  return (
    <section id="data-science" className="section" style={{
      background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)',
      position: 'relative',
    }}>
      {/* Left accent bar */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: '15%',
        bottom: '15%',
        width: 3,
        background: 'linear-gradient(to bottom, transparent, var(--tech-500), transparent)',
      }} />

      <div className="container">
        {/* Header */}
        <p className="section-eyebrow tech">The Builder</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 60 }}>
          <div>
            <h2 className="section-title">
              Deep Learning &<br />
              <span className="glow-tech">Open Source</span>
            </h2>
            <p className="section-subtitle">
              Principal Data Scientist at Walmart Global Tech · Creator of frameworks used by ML practitioners worldwide.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="https://github.com/manujosephv" target="_blank" rel="noopener noreferrer" className="btn btn-tech">
              View GitHub ↗
            </a>
            <a href="https://deep-and-shallow.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Read Blog ↗
            </a>
          </div>
        </div>

        {/* Featured Project: PyTorch Tabular */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--tech-border)',
          borderRadius: 20,
          padding: '40px 44px',
          marginBottom: 32,
          boxShadow: '0 0 60px var(--tech-glow)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Corner glow */}
          <div style={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 240,
            height: 240,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(96,165,250,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20, marginBottom: 20 }}>
            <div>
              <span className="pill pill-tech" style={{ marginBottom: 12 }}>★ Flagship Open Source</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                PyTorch Tabular
              </h3>
            </div>
            <div style={{ display: 'flex', gap: 32 }}>
              {[{ v: '1.6K+', l: 'GitHub Stars' }, { v: '2,000+', l: 'Monthly DLs' }].map(s => (
                <div key={s.l} style={{ textAlign: 'right' }}>
                  <div className="stat-value glow-tech">{s.v}</div>
                  <div className="stat-label">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: 700, marginBottom: 28 }}>
            A unified framework making deep learning on tabular data as easy as calling scikit-learn.
            Built on PyTorch and PyTorch Lightning, it works natively with pandas DataFrames and includes
            state-of-the-art models — NODE, TabNet, FT-Transformer, GANDALF, and GATE — all behind one consistent API.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
            {['PyTorch', 'PyTorch Lightning', 'Tabular ML', 'SOTA Models', 'Open Source', 'Python'].map(tag => (
              <span key={tag} className="pill pill-tech">{tag}</span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="https://github.com/manujosephv/pytorch_tabular" target="_blank" rel="noopener noreferrer" className="btn btn-tech">
              GitHub ↗
            </a>
            <a href="https://arxiv.org/abs/2104.13638" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              ArXiv Paper ↗
            </a>
            <a href="https://pytorch-tabular.readthedocs.io" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Docs ↗
            </a>
          </div>
        </div>

        {/* Other projects grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20,
          marginBottom: 80,
        }}>
          {projects.slice(1).map(p => (
            <div key={p.name} className="card tech" style={{ padding: '28px 28px' }}>
              <span className="pill pill-neutral" style={{ marginBottom: 14 }}>{p.tag}</span>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>
                {p.name}
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
                {p.desc}
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                {p.links.map(l => (
                  <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: 12, padding: '6px 12px' }}>
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Research Papers */}
        <div style={{ marginBottom: 80 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
            Research Papers
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 32 }}>
            Published on ArXiv at the intersection of deep learning, tabular data, and forecasting.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)' }}>
            {papers.map((p, i) => (
              <a
                key={p.id}
                href={`https://arxiv.org/abs/${p.id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  padding: '20px 24px',
                  background: i % 2 === 0 ? 'var(--bg-card)' : 'rgba(255,255,255,0.01)',
                  transition: 'background 0.2s',
                  textDecoration: 'none',
                  borderBottom: i < papers.length - 1 ? '1px solid var(--border)' : 'none',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--tech-glow)'}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'var(--bg-card)' : 'rgba(255,255,255,0.01)'}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--tech-400)', minWidth: 36, fontWeight: 600 }}>
                  {p.year}
                </span>
                <span style={{ flex: 1, color: 'var(--text-primary)', fontSize: 14, fontWeight: 500, lineHeight: 1.4 }}>
                  {p.title}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                  {p.id}
                </span>
                <span style={{ color: 'var(--tech-400)', fontSize: 14 }}>↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* Book + Blog row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 80 }}>
          {/* Book */}
          <div className="card tech" style={{ padding: 32 }}>
            <span className="pill pill-tech" style={{ marginBottom: 16 }}>📘 Packt Publishing</span>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.3 }}>
              Modern Time Series Forecasting with Python
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
              2nd Edition · Co-author: Jeffrey Tackes
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              A comprehensive, industry-ready guide covering classical methods (ARIMA) through modern deep learning
              — LSTMs, Transformers, N-BEATS — with real-world applications and interpretability.
            </p>
            <a href="https://www.amazon.com/Modern-Time-Forecasting-Python-industry-ready/dp/1803246804" target="_blank" rel="noopener noreferrer" className="btn btn-tech" style={{ fontSize: 13 }}>
              View on Amazon ↗
            </a>
          </div>

          {/* Blog */}
          <div className="card tech" style={{ padding: 32 }}>
            <span className="pill pill-neutral" style={{ marginBottom: 16 }}>✍️ Technical Blog</span>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
              Deep &amp; Shallow
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
              deep-and-shallow.com
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              In-depth explorations of time series, tabular deep learning, explainability, probabilistic
              forecasting, and gradient boosting. Also on Medium.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <a href="https://deep-and-shallow.com" target="_blank" rel="noopener noreferrer" className="btn btn-tech" style={{ fontSize: 13 }}>
                Read Blog ↗
              </a>
              <a href="https://medium.com/@manujosephv" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: 13 }}>
                Medium ↗
              </a>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 20 }}>
            Skills &amp; Tools
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {skills.map(s => (
              <span key={s} className="pill pill-tech" style={{ fontSize: 13 }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #data-science .container > div:nth-child(4) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
