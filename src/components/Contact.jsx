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
    <div className="container" style={{ paddingTop: 80, paddingBottom: 80, width: '100%' }}>

      <p className="eyebrow" style={{ animation: 'fadeInUp 0.8s ease 0.1s both' }}>05 — Contact</p>

      {/* Big email CTA — dvlpr.pro style */}
      <div style={{ marginBottom: 72, animation: 'fadeInUp 0.8s ease 0.2s both' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: 8 }}>
          What would you do if an ML expert and thriller author was just a click away?
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: 40, maxWidth: 540 }}>
          Whether you want to talk data science, open-source, speaking invitations, or just say hello — I'd love to hear from you.
        </p>

        <a
          href="mailto:manujosephv@gmail.com"
          style={{
            display: 'inline-block',
            fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
            borderBottom: '2px solid var(--tech)',
            paddingBottom: 4,
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--tech-light)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-primary)'; }}
        >
          manujosephv@gmail.com ↗
        </a>
      </div>

      {/* Social grid */}
      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20, animation: 'fadeInUp 0.8s ease 0.3s both' }}>
        Find Me Online
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12, animation: 'fadeInUp 0.8s ease 0.4s both' }}>
        {links.map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 18px',
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
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: l.color === 'tech' ? 'var(--tech-light)' : 'var(--creative-light)', marginBottom: 2 }}>
                {l.label}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>
                {l.handle}
              </div>
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: 16 }}>↗</span>
          </a>
        ))}
      </div>
    </div>
  )
}
