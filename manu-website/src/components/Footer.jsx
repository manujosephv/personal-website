export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-void)',
      borderTop: '1px solid var(--border)',
      padding: '48px 0 32px',
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 24,
          marginBottom: 32,
          paddingBottom: 32,
          borderBottom: '1px solid var(--border)',
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: 4 }}>
              Manu Joseph
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.15em' }}>
              DATA SCIENTIST · FICTION AUTHOR
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { l: 'GitHub', h: 'https://github.com/manujosephv' },
              { l: 'LinkedIn', h: 'https://www.linkedin.com/in/manujosephv/' },
              { l: 'Blog', h: 'https://deep-and-shallow.com' },
              { l: 'Instagram', h: 'https://www.instagram.com/author_manu_j/' },
            ].map(link => (
              <a key={link.l} href={link.h} target="_blank" rel="noopener noreferrer" style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                color: 'var(--text-muted)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
              >
                {link.l}
              </a>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Manu Joseph. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--tech-400)', opacity: 0.7 }}>
              ⬡ PyTorch Tabular
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 11, color: 'var(--creative-400)', opacity: 0.7 }}>
              ✦ The Artist
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
