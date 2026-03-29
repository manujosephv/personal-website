import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import Speaking from '../components/Speaking.jsx'
import Contact from '../components/Contact.jsx'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      
      {/* Two Entry Boxes for the branches */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 32 }} className="home-branches-grid">
            
            {/* The Builder */}
            <div className="card tech" style={{ padding: 40, border: '1px solid var(--tech-border)' }}>
              <span className="pill pill-tech" style={{ marginBottom: 16 }}>Data Science & ML</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>
                The <span className="glow-tech">Builder</span>
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: 32 }}>
                Principal Data Scientist at Walmart Global Tech. Creator of PyTorch Tabular and other open-source frameworks shaping modern machine learning.
              </p>
              <Link to="/builder" className="btn btn-tech" style={{ display: 'inline-flex' }}>
                Explore My Work ↗
              </Link>
            </div>

            {/* The Storyteller */}
            <div className="card creative" style={{ padding: 40, border: '1px solid var(--creative-border)' }}>
              <span className="pill pill-creative" style={{ marginBottom: 16 }}>Fiction & Narrative</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>
                The <span className="glow-creative">Storyteller</span>
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: 32 }}>
                Author of the critically acclaimed psychological thriller <em>The Artist</em>. Exploring the depths of human nature through intricate fiction.
              </p>
              <Link to="/storyteller" className="btn btn-creative" style={{ display: 'inline-flex' }}>
                Read the Story ↗
              </Link>
            </div>

          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .home-branches-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      <Speaking />
      <Contact />
    </main>
  )
}
