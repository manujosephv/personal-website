const papers = [
  { title: 'PyTorch Tabular: A Framework for Deep Learning with Tabular Data', year: '2021', id: '2104.13638' },
  { title: 'GANDALF: Gated Adaptive Network for Deep Automated Learning of Features', year: '2022', id: '2207.08548' },
  { title: 'GATE: Gated Additive Tree Ensemble for Tabular Classification and Regression', year: '2022', id: '2207.08548' },
  { title: 'AskYourDB: An End-to-End System for Querying Relational Databases with Natural Language', year: '2022', id: '2210.08532' },
  { title: 'LAMA-Net: Unsupervised Domain Adaptation via Latent Alignment and Manifold Learning for RUL Prediction', year: '2022', id: '2208.08388' },
  { title: 'Ensemble Creation via Anchored Regularization for Unsupervised Aspect Extraction', year: '2022', id: '2210.06829' },
]

export default function DataScience() {
  return (
    <div className="container" style={{ paddingTop: 80, paddingBottom: 80, width: '100%' }}>

      {/* ── Hero Intro ── */}
      <p className="eyebrow tech" style={{ marginBottom: 16 }}>The Builder</p>
      <h1 style={{
        fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.1,
        letterSpacing: '-0.03em', marginBottom: 24,
      }}>
        Time Series.{' '}
        <span style={{ color: 'var(--tech-light)' }}>Deep Learning.</span>
        <br />Open Source.
      </h1>
      <p style={{
        color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8,
        maxWidth: 680, marginBottom: 16,
      }}>
        I build tools that help practitioners go from idea to deployed model faster. My open-source work
        sits at the intersection of academic research and production engineering — making state-of-the-art
        deep learning accessible without sacrificing rigour.
      </p>
      <p style={{
        color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8,
        maxWidth: 680, marginBottom: 40,
      }}>
        Over <strong style={{ color: 'var(--text-primary)' }}>15+ years</strong>, I've applied ML to
        Fortune 500 transformations — from supply chain demand forecasting to novel deep learning
        architectures. I ship production models <em>and</em> publish research.
      </p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 72 }}>
        <a href="https://github.com/manujosephv" target="_blank" rel="noopener noreferrer" className="btn btn-tech">GitHub ↗</a>
        <a href="https://deep-and-shallow.com" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Blog ↗</a>
        <a href="https://scholar.google.com/citations?user=oycu9JcAAAAJ" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Google Scholar ↗</a>
      </div>

      {/* ── PyTorch Tabular Flagship ── */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid rgba(59,130,246,0.25)',
        borderRadius: 16, padding: '40px 44px',
        marginBottom: 64, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -80, right: -80,
          width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 24, marginBottom: 20 }}>
          <div>
            <span className="pill pill-tech" style={{ marginBottom: 12 }}>★ Flagship Open Source</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>PyTorch Tabular</h2>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic' }}>
              "Deep learning on tabular data, without the boilerplate."
            </p>
          </div>
          <div style={{ display: 'flex', gap: 32 }}>
            {[{ v: '1,600+', l: 'GitHub Stars' }, { v: '8K+', l: 'Monthly DLs' }].map(s => (
              <div key={s.l} style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--tech-light)', lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, maxWidth: 680, marginBottom: 28, fontSize: '1rem' }}>
          A unified framework making deep learning on tabular data as easy as calling scikit-learn.
          Built on PyTorch Lightning, works natively with pandas DataFrames. I baked in every SOTA
          model — NODE, TabNet, FT-Transformer, GANDALF, GATE — all behind one consistent API so
          practitioners don't have to re-implement them from scratch.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
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

      {/* ── Research Papers ── */}
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8 }}>Research Papers</h2>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
          {[
            { v: '6', l: 'Publications' },
            { v: '232', l: 'Citations' },
            { v: 'h-4', l: 'h-index' },
            { v: '13', l: 'Highly Influential' },
          ].map(s => (
            <div key={s.l} style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--tech-light)' }}>{s.v}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', marginBottom: 64 }}>
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

      {/* ── What I'm Working On ── */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8 }}>What I'm Building Now</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: 28, maxWidth: 560 }}>
        Active research and engineering at the frontier of ML — from foundational models to novel architectures.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16, marginBottom: 64 }}>

        {/* Foundational TSF Model */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid rgba(59,130,246,0.2)',
          borderRadius: 14, padding: '28px 28px', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span className="pill pill-tech" style={{ fontSize: 10 }}>🔬 Active Research</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>Dec 2024 – Present</span>
          </div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10, lineHeight: 1.3 }}>
            Foundational Time Series Forecasting Model
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7, marginBottom: 14 }}>
            A MAMBA-based foundational model for zero-shot forecasting. Outperforms equally-sized foundational models while being significantly faster and lighter — 10K time series in 1 hour on a single V100.
          </p>
          <ul style={{ color: 'var(--text-muted)', fontSize: 12, lineHeight: 1.8, paddingLeft: 16, margin: 0 }}>
            <li>Hugging Face–style model registry for easy deployment</li>
            <li>Fine-tuning on specific series with exogenous variables</li>
            <li>Exploring test-time compute improvements</li>
          </ul>
        </div>

        {/* Patent 1 */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid rgba(251,191,36,0.15)', borderRadius: 14, padding: '28px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span className="pill pill-neutral" style={{ fontSize: 10, background: 'rgba(251,191,36,0.08)', borderColor: 'rgba(251,191,36,0.2)', color: 'rgb(251,191,36)' }}>⚖️ Patent Filed</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>Dec 2023 – Present</span>
          </div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10, lineHeight: 1.3 }}>
            ML-based Marketing Attribution System
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7, marginBottom: 14 }}>
            A novel causal ML model at item-week granularity (Walmart-scale) that attributes total sales to individual marketing and pricing interventions.
          </p>
          <ul style={{ color: 'var(--text-muted)', fontSize: 12, lineHeight: 1.8, paddingLeft: 16, margin: 0 }}>
            <li>Transfer functions for macro and micro impact estimation</li>
            <li>Genetic Algorithm–based non-linear budget optimisation</li>
            <li>Deployed as a production Streamlit app</li>
          </ul>
        </div>

        {/* Patent 2 */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid rgba(251,191,36,0.15)', borderRadius: 14, padding: '28px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span className="pill pill-neutral" style={{ fontSize: 10, background: 'rgba(251,191,36,0.08)', borderColor: 'rgba(251,191,36,0.2)', color: 'rgb(251,191,36)' }}>⚖️ Patent Filed</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>Feb 2025</span>
          </div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10, lineHeight: 1.3 }}>
            Conformal Prediction for Gradient Boosted Trees
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7, marginBottom: 14 }}>
            A novel technique for adaptive prediction intervals using the local leaf structure of GBDT models — without the typical distributional assumptions of classical conformal methods.
          </p>
          <ul style={{ color: 'var(--text-muted)', fontSize: 12, lineHeight: 1.8, paddingLeft: 16, margin: 0 }}>
            <li>Leaf trajectory re-imagined as a graph structure</li>
            <li>Graph Neural Network for residual prediction</li>
          </ul>
        </div>

      </div>

      {/* ── Book ── */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 24 }}>The Book</h2>
      <div style={{
        display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 40,
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 16, padding: '36px 40px', marginBottom: 64,
        alignItems: 'center',
      }} className="book-card">
        <img
          src="/book-tech-cover.jpg"
          alt="Modern Time Series Forecasting with Python Book Cover"
          onError={e => { e.target.style.display = 'none' }}
          style={{ width: 140, borderRadius: 8, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
        />
        <div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
            <span className="pill pill-tech">📘 Packt Publishing</span>
            <span className="pill pill-neutral">2nd Edition</span>
            <span className="pill pill-neutral">Best Seller</span>
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 6, lineHeight: 1.25 }}>
            Modern Time Series Forecasting with Python
          </h3>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', marginBottom: 14 }}>
            Co-author: Jeffrey Tackes
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 22, maxWidth: 560 }}>
            The definitive practitioner's guide to time series forecasting in Python. I cover everything
            from ARIMA and ETS through modern deep learning — LSTMs, Transformers, N-BEATS — and
            probabilistic forecasting with interpretability baked in. Industry-ready patterns throughout.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href="https://www.amazon.com/Modern-Time-Forecasting-Python-Industry-ready-ebook/dp/B0D5C165R2"
              target="_blank" rel="noopener noreferrer" className="btn btn-tech" style={{ fontSize: 13 }}>
              Amazon ↗
            </a>
            <a href="https://www.oreilly.com/library/view/modern-time-series/9781835883181/"
              target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ fontSize: 13 }}>
              O'Reilly ↗
            </a>
            <a href="https://www.packtpub.com/en-ec/product/modern-time-series-forecasting-with-python-9781835883198"
              target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ fontSize: 13 }}>
              Packt ↗
            </a>
            <a href="https://github.com/PacktPublishing/Modern-Time-Series-Forecasting-with-Python-2E"
              target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ fontSize: 13 }}>
              Code Repo ↗
            </a>
          </div>
        </div>
      </div>

      {/* ── Writing & Blog ── */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 24 }}>Writing</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="ds-two-col">
        <div className="card tech" style={{ padding: 28 }}>
          <span className="pill pill-neutral" style={{ marginBottom: 14 }}>✍️ Technical Blog</span>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 6 }}>Deep &amp; Shallow</h4>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', marginBottom: 12 }}>
            deep-and-shallow.com
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7, marginBottom: 18 }}>
            In-depth explorations of time series, tabular deep learning, explainability, and probabilistic
            forecasting. Where I share the ideas that don't fit in a paper.
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <a href="https://deep-and-shallow.com" target="_blank" rel="noopener noreferrer" className="btn btn-tech" style={{ fontSize: 13 }}>Blog ↗</a>
            <a href="https://deep-and-shallow.com/author/manujosephv/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ fontSize: 13 }}>My Posts ↗</a>
          </div>
        </div>
        <div className="card tech" style={{ padding: 28 }}>
          <span className="pill pill-neutral" style={{ marginBottom: 14 }}>📝 Medium</span>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 6 }}>@manujosephv</h4>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', marginBottom: 12 }}>
            medium.com/@manujosephv
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7, marginBottom: 18 }}>
            Accessible ML tutorials and commentary for a wider audience. Practical write-ups on tools,
            architectures, and ideas from the field.
          </p>
          <a href="https://medium.com/@manujosephv" target="_blank" rel="noopener noreferrer" className="btn btn-tech" style={{ fontSize: 13 }}>Medium ↗</a>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .ds-two-col { grid-template-columns: 1fr !important; }
          .book-card { grid-template-columns: 1fr !important; }
          .book-card img { width: 100px !important; margin: 0 auto }
        }
      `}</style>
    </div>
  )
}
