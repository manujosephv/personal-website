import { useState, useEffect } from 'react'

export default function SideNav({ sections, activeIndex }) {
  const activeId = sections[activeIndex]?.id

  return (
    <div style={{
      position: 'fixed',
      right: 'clamp(16px, 3vw, 40px)',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 90,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 0,
    }} className="side-nav">

      {/* Scroll Down label at top */}
      <div style={{
        writingMode: 'vertical-rl',
        fontFamily: 'var(--font-mono)',
        fontSize: 9,
        letterSpacing: '0.2em',
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        marginBottom: 20,
        opacity: 0.6,
      }}>
        Scroll
      </div>

      {/* Vertical line + numbered dots */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
        {/* The line */}
        <div style={{
          position: 'absolute',
          top: 0, bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 1,
          background: 'var(--border)',
        }} />

        {sections.map(({ id, label }) => {
          const isActive = activeId === id
          return (
            <a
              key={id}
              href={`#${id}`}
              title={id}
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 0',
                transition: 'all 0.2s',
              }}
            >
              {/* Number label on hover / active */}
              <span style={{
                position: 'absolute',
                right: 14,
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.05em',
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                opacity: isActive ? 1 : 0,
                transition: 'opacity 0.2s, color 0.2s',
                whiteSpace: 'nowrap',
              }} className="side-nav-label">
                {label}
              </span>

              {/* Dot */}
              <span style={{
                width: isActive ? 8 : 5,
                height: isActive ? 8 : 5,
                borderRadius: '50%',
                background: isActive ? 'var(--text-primary)' : 'var(--border-mid)',
                transition: 'all 0.25s ease',
                display: 'block',
              }} />
            </a>
          )
        })}
      </div>

      <style>{`
        .side-nav a:hover .side-nav-label { opacity: 1 !important; }
        @media (max-width: 768px) { .side-nav { display: none; } }
      `}</style>
    </div>
  )
}
