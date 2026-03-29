import { Link } from 'react-router-dom';

export default function Pathways() {
  return (
    <div className="container" style={{ paddingTop: 100, paddingBottom: 100 }}>
      {/* Eyebrow */}
      <h2 style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        letterSpacing: '0.15em',
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        marginBottom: 20,
        animation: 'fadeInUp 0.8s ease 0.1s both',
      }}>
        02 / 03 — The Dual Paths
      </h2>

      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
        fontWeight: 700,
        color: 'var(--text-primary)',
        lineHeight: 1.1,
        marginBottom: 60,
        maxWidth: 700,
        animation: 'fadeInUp 0.8s ease 0.2s both',
      }}>
        Two distinct journeys of creation, blending logic and storytelling.
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 32 }} className="pathways-grid">
        
        {/* The Builder */}
        <div style={{
          padding: 40,
          background: 'rgba(255,255,255,0.015)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          transition: 'all 0.3s ease',
          animation: 'fadeInUp 0.8s ease 0.3s both',
        }} className="hover-card">
          <div style={{ display: 'inline-block', padding: '6px 12px', background: 'var(--tech-glow)', border: '1px solid var(--tech-border)', borderRadius: 6, marginBottom: 24 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--tech-light)' }}>⬡ Data Science & ML</span>
          </div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>
            The Builder
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>
            Deep learning architectures, tabular data frameworks, and open-source intelligence. Explore PyTorch Tabular, research papers, and technical books.
          </p>
          <Link to="/builder" className="btn btn-solid" style={{ fontSize: 14, padding: '10px 24px' }}>
            Explore Portfolio →
          </Link>
        </div>

        {/* The Storyteller */}
        <div style={{
          padding: 40,
          background: 'rgba(255,255,255,0.015)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          transition: 'all 0.3s ease',
          animation: 'fadeInUp 0.8s ease 0.4s both',
        }} className="hover-card">
          <div style={{ display: 'inline-block', padding: '6px 12px', background: 'var(--creative-glow)', border: '1px solid var(--creative-border)', borderRadius: 6, marginBottom: 24 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--creative-light)' }}>✦ Fiction & Narrative</span>
          </div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>
            The Storyteller
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>
            Psychological thrillers and narratives diving into the human psyche. Discover <em>The Artist</em>, characters, and podcasting experiments.
          </p>
          <Link to="/storyteller" className="btn btn-creative" style={{ fontSize: 14, padding: '10px 24px' }}>
            Read the Story →
          </Link>
        </div>
      </div>

      <style>{`
        .hover-card:hover {
          background: rgba(255,255,255,0.03) !important;
          border-color: rgba(255,255,255,0.15) !important;
        }
        @media (max-width: 860px) {
          .pathways-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .container h3 { margin-bottom: 32px !important; }
        }
      `}</style>
    </div>
  );
}
