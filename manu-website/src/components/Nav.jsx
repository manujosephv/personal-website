import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'The Builder', href: '/builder' },
  { label: 'The Storyteller', href: '/storyteller' },
  { label: 'Speaking', href: '/#speaking' },
  { label: 'Contact', href: '/#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      transition: 'all 0.4s ease',
      background: scrolled ? 'rgba(9,9,15,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        {/* Logo */}
        <a href="#hero" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
            Manu Joseph
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.15em', marginTop: 2 }}>
            DATA · FICTION
          </span>
        </a>

        {/* Desktop nav */}
        <ul style={{ display: 'flex', gap: 8, listStyle: 'none', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link to={link.href} style={{
                padding: '8px 14px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--text-secondary)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="https://github.com/manujosephv"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-tech"
              style={{ padding: '8px 16px', fontSize: 13 }}
            >
              GitHub ↗
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            fontSize: 22,
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'rgba(9,9,15,0.97)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--border)',
          padding: '16px 24px 24px',
        }}>
          {navLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '14px 0',
                borderBottom: '1px solid var(--border)',
                fontSize: 16,
                fontWeight: 500,
                color: 'var(--text-secondary)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
