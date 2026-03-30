export default function Footer() {
  return (
    <footer style={{
      position: 'relative',
      zIndex: 1,
      borderTop: '1px solid var(--border)',
      padding: '32px 0',
      background: 'var(--bg)',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <div>
          <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>
            Manu Joseph
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.15em', marginLeft: 12 }}>
            PRINCIPAL DATA SCIENTIST · FICTION AUTHOR
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tech-light)', opacity: 0.6 }}>
            ⬡ PyTorch Tabular
          </span>
          <span style={{ fontFamily: 'var(--font-sans)', fontStyle: 'italic', fontSize: 10, color: 'var(--creative-light)', opacity: 0.6 }}>
            ✦ The Artist
          </span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  )
}
