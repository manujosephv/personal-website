import { Link } from 'react-router-dom';
import Author from '../components/Author.jsx';

export default function Storyteller() {
  return (
    <main>
      <div style={{ padding: '120px 24px 60px', textAlign: 'center', background: 'var(--bg-void)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--text-primary)', marginBottom: 20 }}>
          The <span className="glow-creative">Storyteller</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto 40px', fontSize: '1.2rem' }}>
          Exploring the depths of human psychology through fiction and narrative.
        </p>
        <Link to="/" className="btn btn-outline">← Back to Home</Link>
      </div>
      <div style={{ paddingBottom: '80px' }}>
        <Author />
      </div>
      
      {/* Expanded Storyteller content (Little Pajama Tales) */}
      <section className="container" style={{ paddingBottom: '80px' }}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: '40px',
        }}>
          <span className="pill pill-neutral" style={{ marginBottom: 12 }}>Past Project</span>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>
            Little Pajama Tales
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: 24 }}>
            "Cozy Adventures, Big Values." An AI-assisted children's audio storytelling podcast I created that reached families in 20+ countries. It featured bite-sized, imaginative bedtime stories designed to enrich bedtime routines and impart values like honesty and courage.
          </p>
          <a href="https://shows.acast.com/littlepajamatales" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            View on Acast ↗
          </a>
        </div>
      </section>
    </main>
  );
}
