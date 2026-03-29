import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav({ sections, activeIndex, onNavigate }) {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const activeId = sections && activeIndex !== undefined ? sections[activeIndex]?.id : null

  useEffect(() => {
    const onScroll = () => {
      if (!isHome) setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  const isSolid = !isHome || scrolled || activeIndex > 0

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 1000,
      height: 64,
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      transition: 'all 0.3s ease',
      background: isSolid ? 'rgba(11, 11, 15, 0.75)' : 'transparent',
      backdropFilter: isSolid ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: isSolid ? 'blur(12px)' : 'none',
      borderBottom: isSolid ? '1px solid var(--border)' : '1px solid transparent',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: 0,
      }}>
        
        {/* Logo */}
        <Link 
          to="/" 
          onClick={(e) => {
            if (isHome && onNavigate) {
              e.preventDefault();
              onNavigate(0);
            } else {
              window.scrollTo(0,0);
            }
          }}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 10,
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: '1.1rem',
            color: 'var(--text-primary)'
          }}
        >
          <span style={{ 
            width: 8, height: 8, borderRadius: '50%', 
            background: isHome ? 'var(--tech)' : 'var(--creative)',
            boxShadow: `0 0 10px ${isHome ? 'var(--tech-glow)' : 'var(--creative-glow)'}`
          }} />
          Manu Joseph
        </Link>

        {/* Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 3vw, 32px)' }} className="nav-links">
          {isHome && sections ? (
            sections.map(({ id, label }, i) => {
              if (id === 'contact') return null; // Remove the "no box" contact link
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate(i);
                  }}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: activeId === id ? 'var(--text-primary)' : 'var(--text-muted)',
                    transition: 'color 0.2s ease',
                    position: 'relative',
                    padding: '8px 0',
                  }}
                >
                  {label}
                  {activeId === id && (
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      background: 'var(--tech)',
                      borderRadius: '2px',
                    }} />
                  )}
                </a>
              )
            })
          ) : (
            // Subpage links
            <>
              <Link to="/" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Home
              </Link>
              <Link to="/builder" style={{ 
                fontFamily: 'var(--font-mono)', fontSize: 11, 
                color: location.pathname === '/builder' ? 'var(--tech-light)' : 'var(--text-muted)', 
                textTransform: 'uppercase' 
              }}>
                Two Paths
              </Link>
              <Link to="/storyteller" style={{ 
                fontFamily: 'var(--font-mono)', fontSize: 11, 
                color: location.pathname === '/storyteller' ? 'var(--creative-light)' : 'var(--text-muted)', 
                textTransform: 'uppercase' 
              }}>
                Author
              </Link>
            </>
          )}
          
          {/* Persistent Contact button (the one WITH the box) */}
          <a
            href="/#contact"
            onClick={(e) => {
              if (isHome && onNavigate) {
                e.preventDefault();
                const contactIdx = sections.findIndex(s => s.id === 'contact');
                if (contactIdx !== -1) onNavigate(contactIdx);
              }
            }}
            className="btn btn-ghost"
            style={{ 
              fontSize: 11, 
              padding: '6px 16px', 
              fontFamily: 'var(--font-mono)', 
              textTransform: 'uppercase',
              marginLeft: 8,
              // Background to highlight it as a button
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border)',
            }}
          >
            Contact
          </a>
        </div>
      </div>

      <style>{`
        .nav-links a:hover { color: var(--text-primary) !important; }
        @media (max-width: 640px) {
          .nav-links a:not(.btn) { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
