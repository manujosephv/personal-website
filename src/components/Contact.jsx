const links = [
  { label: 'LinkedIn',  handle: 'manujosephv',      href: 'https://www.linkedin.com/in/manujosephv/', color: 'tech' },
  { label: 'GitHub',    handle: 'manujosephv',      href: 'https://github.com/manujosephv',           color: 'tech' },
  { label: 'Blog',      handle: 'deep-and-shallow.com', href: 'https://deep-and-shallow.com',         color: 'tech' },
  { label: 'Medium',    handle: '@manujosephv',     href: 'https://medium.com/@manujosephv',           color: 'tech' },
  { label: 'Instagram', handle: '@author_manu_j',   href: 'https://www.instagram.com/author_manu_j/', color: 'creative' },
  { label: 'Amazon',    handle: 'Books',             href: 'https://www.amazon.in/stores/Manu-Joseph/author/B0BL85MBVW', color: 'creative' },
]

export default function Contact() {
  return (
    <div className="container" style={{ 
      paddingTop: 'clamp(60px, 10vh, 100px)', 
      paddingBottom: 'clamp(80px, 12vh, 120px)', 
      width: '100%' 
    }}>

      <p className="eyebrow" style={{ animation: 'fadeInUp 0.8s ease 0.1s both' }}>05 — Contact</p>

      {/* Big email CTA — dvlpr.pro style */}
      <div style={{ marginBottom: 'clamp(48px, 8vh, 72px)', animation: 'fadeInUp 0.8s ease 0.2s both' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: 8 }}>
          What would you do if an ML expert and thriller author was just a click away?
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 1.2vw, 1.1rem)', marginBottom: 32, maxWidth: 540, lineHeight: 1.7 }}>
          Whether you want to talk data science, open-source, speaking invitations, or just say hello — I'd love to hear from you.
        </p>

        <a
          href="mailto:manujosephv@gmail.com"
          style={{
            display: 'inline-block',
            fontSize: 'clamp(1.3rem, 5vw, 2.2rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
            borderBottom: '2px solid var(--tech)',
            paddingBottom: 4,
            transition: 'color 0.2s, border-color 0.2s',
            wordBreak: 'break-all',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--tech-light)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-primary)'; }}
        >
          manujosephv@gmail.com ↗
        </a>
      </div>

      {/* Social grid */}
      <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20, animation: 'fadeInUp 0.8s ease 0.3s both' }}>
        Find Me Online
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(160px, 45vw, 280px), 1fr))', gap: 'clamp(10px, 2vw, 16px)', animation: 'fadeInUp 0.8s ease 0.4s both' }}>
        {links.map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: 'clamp(14px, 2vw, 18px) clamp(16px, 2.5vw, 20px)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              textDecoration: 'none', transition: 'border-color 0.22s, box-shadow 0.22s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = l.color === 'tech' ? 'rgba(59,130,246,0.3)' : 'rgba(245,158,11,0.3)'
              e.currentTarget.style.boxShadow = l.color === 'tech' ? '0 4px 16px rgba(59,130,246,0.08)' : '0 4px 16px rgba(245,158,11,0.08)'
            }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{ minWidth: 0, flex: 1, marginRight: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: l.color === 'tech' ? 'var(--tech-light)' : 'var(--creative-light)', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {l.label}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {l.handle}
              </div>
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: 14, flexShrink: 0 }}>↗</span>
          </a>
        ))}
      </div>
    </div>
  )
}
