import { Link } from 'react-router-dom';
import DataScience from '../components/DataScience.jsx';

export default function Builder() {
  return (
    <main>
      <div style={{ padding: '120px 24px 60px', textAlign: 'center', background: 'var(--bg-void)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--text-primary)', marginBottom: 20 }}>
          The <span className="glow-tech">Builder</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto 40px', fontSize: '1.2rem' }}>
          My journey through data science, open source contributions, and ML research.
        </p>
        <Link to="/" className="btn btn-outline">← Back to Home</Link>
      </div>
      <div style={{ paddingBottom: '80px' }}>
        <DataScience />
      </div>
    </main>
  );
}
