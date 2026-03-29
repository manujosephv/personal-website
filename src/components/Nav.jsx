import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav({ sections, activeIndex, onNavigate }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const isSolid = !isHome || scrolled || activeIndex > 0 || mobileMenuOpen

  const NavLinks = ({ isMobile = false }) => (
    <>
      {isHome && sections ? (
        sections.map(({ id, label }, i) => {
          if (id === 'contact') return null;
          return (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate(i);
                if (isMobile) setMobileMenuOpen(false);
              }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: isMobile ? '16px' : '11px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: activeId === id ? 'var(--text-primary)' : 'var(--text-muted)',
                transition: 'color 0.2s ease',
                position: 'relative',
                padding: isMobile ? '16px 0' : '8px 12px',
                display: isMobile ? 'flex' : 'inline-flex',
                alignItems: 'center',
              }}
            >
              {label}
              {!isMobile && activeId === id && (
                <span style={{
                  position: 'absolute',
                  bottom: -2,
                  left: 6,
                  right: 6,
                  height: '2px',
                  background: 'var(--tech)',
                  borderRadius: '2px',
                }} />
              )}
            </a>
          )
        })
      ) : (
        <>
          <Link to="/" style={{ fontFamily: 'var(--font-mono)', fontSize: isMobile ? 16 : 11, color: 'var(--text-muted)', textTransform: 'uppercase', padding: isMobile ? '16px 0' : '8px 12px', display: isMobile ? 'flex' : 'inline-flex' }}>
            Home
          </Link>
          <Link to="/builder" style={{ 
            fontFamily: 'var(--font-mono)', fontSize: isMobile ? 16 : 11, 
            color: location.pathname === '/builder' ? 'var(--tech-light)' : 'var(--text-muted)', 
            textTransform: 'uppercase', padding: isMobile ? '16px 0' : '8px 12px', display: isMobile ? 'flex' : 'inline-flex'
          }}>
            Two Paths
          </Link>
          <Link to="/storyteller" style={{ 
            fontFamily: 'var(--font-mono)', fontSize: isMobile ? 16 : 11, 
            color: location.pathname === '/storyteller' ? 'var(--creative-light)' : 'var(--text-muted)', 
            textTransform: 'uppercase', padding: isMobile ? '16px 0' : '8px 12px', display: isMobile ? 'flex' : 'inline-flex'
          }}>
            Author
          </Link>
        </>
      )}
      
      <a
        href="/#contact"
        onClick={(e) => {
          if (isHome && onNavigate) {
            e.preventDefault();
            const contactIdx = sections.findIndex(s => s.id === 'contact');
            if (contactIdx !== -1) onNavigate(contactIdx);
          }
          if (isMobile) setMobileMenuOpen(false);
        }}
        className="btn btn-ghost"
        style={{ 
          fontSize: isMobile ? 14 : 11, 
          padding: isMobile ? '12px 24px' : '6px 16px', 
          fontFamily: 'var(--font-mono)', 
          textTransform: 'uppercase',
          marginLeft: isMobile ? 0 : 8,
          marginTop: isMobile ? 24 : 0,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid var(--border)',
          width: isMobile ? '100%' : 'auto',
          justifyContent: 'center',
        }}
      >
        Contact
      </a>
    </>
  )

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
      background: isSolid ? 'rgba(11, 11, 15, 0.9)' : 'transparent',
      backdropFilter: isSolid ? 'blur(16px)' : 'none',
      WebkitBackdropFilter: isSolid ? 'blur(16px)' : 'none',
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
            setMobileMenuOpen(false);
          }}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 10,
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: '1.1rem',
            color: 'var(--text-primary)',
            zIndex: 1100,
          }}
        >
          <span style={{ 
            width: 8, height: 8, borderRadius: '50%', 
            background: isHome ? 'var(--tech)' : 'var(--creative)',
            boxShadow: `0 0 10px ${isHome ? 'var(--tech-glow)' : 'var(--creative-glow)'}`
          }} />
          Manu Joseph
        </Link>

        {/* Desktop Navigation */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 'clamp(12px, 3vw, 32px)' }} className="desktop-nav desktop-only">
          <NavLinks />
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-only"
          style={{
            zIndex: 1100,
            padding: 8,
            color: 'var(--text-primary)',
            background: 'transparent',
            border: 'none',
            outline: 'none',
          }}
          aria-label="Toggle menu"
        >
          <div style={{
            width: 24,
            height: 18,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <span style={{ 
              width: '100%', height: 2, background: 'currentColor', borderRadius: 2,
              transition: 'all 0.3s ease',
              transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none'
            }} />
            <span style={{ 
              width: '100%', height: 2, background: 'currentColor', borderRadius: 2,
              transition: 'all 0.3s ease',
              opacity: mobileMenuOpen ? 0 : 1
            }} />
            <span style={{ 
              width: '100%', height: 2, background: 'currentColor', borderRadius: 2,
              transition: 'all 0.3s ease',
              transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none'
            }} />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        background: 'var(--bg)',
        zIndex: 1050,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 40px',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: mobileMenuOpen ? 1 : 0,
        visibility: mobileMenuOpen ? 'visible' : 'hidden',
        pointerEvents: mobileMenuOpen ? 'auto' : 'none',
        transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-20px)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <NavLinks isMobile={true} />
        </div>
      </div>

      <style>{`
        .desktop-nav a:hover { color: var(--text-primary) !important; }
        .desktop-only { display: flex; }
        .mobile-only { display: none; }
        
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
