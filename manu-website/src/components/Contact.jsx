const links = [
  {
    label: 'LinkedIn',
    handle: 'manujosephv',
    href: 'https://www.linkedin.com/in/manujosephv/',
    icon: '💼',
    desc: 'Professional updates & connections',
    color: 'var(--tech-400)',
  },
  {
    label: 'GitHub',
    handle: 'manujosephv',
    href: 'https://github.com/manujosephv',
    icon: '⬡',
    desc: 'Open-source projects & code',
    color: 'var(--tech-400)',
  },
  {
    label: 'Blog',
    handle: 'deep-and-shallow.com',
    href: 'https://deep-and-shallow.com',
    icon: '✍️',
    desc: 'Technical writing on ML',
    color: 'var(--tech-400)',
  },
  {
    label: 'Medium',
    handle: '@manujosephv',
    href: 'https://medium.com/@manujosephv',
    icon: '📝',
    desc: 'ML tutorials & articles',
    color: 'var(--tech-400)',
  },
  {
    label: 'Instagram',
    handle: '@author_manu_j',
    href: 'https://www.instagram.com/author_manu_j/',
    icon: '✦',
    desc: 'The Artist novel & author updates',
    color: 'var(--creative-400)',
  },
  {
    label: 'Amazon',
    handle: 'Manu J',
    href: 'https://www.amazon.in/stores/Manu-Joseph/author/B0BL85MBVW',
    icon: '📚',
    desc: 'Books — fiction & technical',
    color: 'var(--creative-400)',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section" style={{
      background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-void) 100%)',
    }}>
      <div className="container">
        <p className="section-eyebrow neutral">Let's Connect</p>
        <h2 className="section-title">Find Me Online</h2>
        <p className="section-subtitle" style={{ marginBottom: 60 }}>
          Whether you're interested in data science, open-source collaboration, or the fiction — I'd love to hear from you.
        </p>

        {/* Email CTA */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 20,
          padding: '44px 48px',
          marginBottom: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 24,
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
              Direct
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
              Drop me an email
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
              For collaboration, speaking invitations, or just to say hello.
            </p>
          </div>
          <a
            href="mailto:manujosephv@gmail.com"
            className="btn btn-tech"
            style={{ fontSize: 15, padding: '14px 32px' }}
          >
            manujosephv@gmail.com ↗
          </a>
        </div>

        {/* Social links grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 16,
        }}>
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '20px 20px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 14,
                textDecoration: 'none',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = l.color === 'var(--tech-400)' ? 'var(--tech-border)' : 'var(--creative-border)';
                e.currentTarget.style.boxShadow = l.color === 'var(--tech-400)' ? '0 4px 20px var(--tech-glow)' : '0 4px 20px var(--creative-glow)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: 'rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                flexShrink: 0,
              }}>
                {l.icon}
              </div>
              <div>
                <div style={{ color: l.color, fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{l.label}</div>
                <div style={{ color: 'var(--text-primary)', fontSize: 13, fontFamily: 'var(--font-mono)', marginBottom: 2 }}>{l.handle}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>{l.desc}</div>
              </div>
              <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: 16 }}>↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
