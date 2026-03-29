import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 clamp(24px, 5vw, 72px)',
      height: 64,
      transition: 'background 0.35s, border-color 0.35s',
      background: scrolled ? 'rgba(11,11,15,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
    }}>
      {/* Logo */}
      <a href="/#home" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
          fontWeight: 700,
          color: 'var(--tech-light)',
          letterSpacing: '0.05em',
        }}>
          &gt;_
        </span>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 15,
          fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '0.01em',
        }}>
          MJ
        </span>
      </a>

      {/* Contact button */}
      <a
        href="/#contact"
        className="btn btn-ghost"
        style={{ fontSize: 13, padding: '8px 18px' }}
      >
        Contact
      </a>
    </nav>
  )
}
