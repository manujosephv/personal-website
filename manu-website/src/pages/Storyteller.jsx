import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Author from '../components/Author.jsx';

export default function Storyteller() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="container" style={{ marginBottom: '40px' }}>
        <Link to="/" className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
          <span>←</span> Back to Home
        </Link>
      </div>

      <div style={{ paddingBottom: '40px' }} id="author">
        <Author />
      </div>
      
      {/* Expanded Storyteller content (Little Pajama Tales) */}
      <section className="container" style={{ marginTop: '80px', marginBottom: '80px' }}>
        <div style={{
          background: 'rgba(255,255,255,0.015)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: '40px',
        }}>
          <span className="hero-badge creative" style={{ marginBottom: 12, display: 'inline-block' }}>Past Project</span>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16, marginTop: 16 }}>
            Little Pajama Tales
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, maxWidth: 800, marginBottom: 24 }}>
            "Cozy Adventures, Big Values." An AI-assisted children's audio storytelling podcast I created that reached families in 20+ countries. It featured bite-sized, imaginative bedtime stories designed to enrich bedtime routines and impart values like honesty and courage.
          </p>
          <a href="https://shows.acast.com/littlepajamatales" target="_blank" rel="noopener noreferrer" className="btn btn-creative">
            View on Acast ↗
          </a>
        </div>
      </section>
    </main>
  );
}
