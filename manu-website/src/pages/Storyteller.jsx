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
      
    
    </main>
  );
}
