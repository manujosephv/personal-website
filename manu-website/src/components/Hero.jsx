import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.3,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        color: i % 3 === 0 ? '#60a5fa' : i % 3 === 1 ? '#f59e0b' : '#ffffff',
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Draw faint connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = particles[i].color;
            ctx.globalAlpha = (1 - dist / 120) * 0.08;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section id="hero" style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, var(--bg-void) 0%, var(--bg-primary) 100%)',
    }}>
      {/* Particle canvas */}
      <canvas ref={canvasRef} style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }} />

      {/* Radial glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        height: 600,
        background: 'radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, rgba(245,158,11,0.04) 40%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, padding: '120px 24px 80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ maxWidth: 800, position: 'relative', zIndex: 2 }}>

          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 14px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--border)',
            borderRadius: 999,
            marginBottom: 36,
            animation: 'fadeIn 0.8s ease forwards',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'blink 2s infinite' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>
              Bangalore, India
            </span>
          </div>

          {/* Name */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.2rem, 9vw, 7rem)',
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            marginBottom: 24,
            animation: 'fadeInUp 0.8s ease 0.1s both',
          }}>
            <span style={{ display: 'block', color: 'var(--text-primary)' }}>Manu</span>
            <span style={{ display: 'block', color: 'var(--text-primary)' }}>Joseph.</span>
          </h1>

          {/* Dual role tagline */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            alignItems: 'center',
            marginBottom: 20,
            animation: 'fadeInUp 0.8s ease 0.25s both',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.85rem, 2vw, 1.05rem)',
              fontWeight: 600,
              color: 'var(--tech-400)',
              background: 'var(--tech-glow)',
              border: '1px solid var(--tech-border)',
              padding: '6px 16px',
              borderRadius: 8,
            }}>
              ⬡ Principal Data Scientist
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: 18 }}>×</span>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(0.85rem, 2vw, 1.05rem)',
              fontWeight: 600,
              color: 'var(--creative-400)',
              background: 'var(--creative-glow)',
              border: '1px solid var(--creative-border)',
              padding: '6px 16px',
              borderRadius: 8,
            }}>
              ✦ Storyteller
            </span>
          </div>

          {/* Achievement Cards */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: 36,
            animation: 'fadeInUp 0.8s ease 0.3s both',
          }}>
            {[
              { icon: '⬡', metric: '2K+ Stars', label: 'PyTorch Tabular', type: 'tech' },
              { icon: '🏆', metric: '40 Under 40', label: 'Data Scientist · AIM', type: 'tech' },
              { icon: '📘', metric: 'Packt Book', label: 'Time Series Forecasting', type: 'tech' },
              { icon: '📄', metric: '5 Papers', label: 'ArXiv Published', type: 'tech' },
              { icon: '🎤', metric: 'MLDS 2026', label: 'Keynote Speaker', type: 'tech' },
              { icon: '✦', metric: 'The Artist', label: 'Debut Thriller · 2024', type: 'creative' },
              { icon: '🎙', metric: '20+ Countries', label: 'Little Pajama Tales', type: 'creative' },
            ].map((a, i) => (
              <div key={i} className={`achieve-card ${a.type}`}>
                <span className="achieve-icon">{a.icon}</span>
                <span className="achieve-metric">{a.metric}</span>
                <span className="achieve-label">{a.label}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.75,
            maxWidth: 580,
            marginBottom: 48,
            animation: 'fadeInUp 0.8s ease 0.35s both',
          }}>
            Creator of <span style={{ color: 'var(--tech-300)', fontWeight: 600 }}>PyTorch Tabular</span> —
            the go-to framework for deep learning on tabular data.
            Author of <span style={{ color: 'var(--creative-300)', fontStyle: 'italic', fontWeight: 600 }}>The Artist</span> —
            a psychological thriller that refuses to stay buried.
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex',
            gap: 14,
            flexWrap: 'wrap',
            animation: 'fadeInUp 0.8s ease 0.45s both',
          }}>
            <Link to="/builder" className="btn btn-tech" style={{ fontSize: 15, padding: '13px 28px' }}>
              <span>Explore the Science</span>
              <span>→</span>
            </Link>
            <Link to="/storyteller" className="btn btn-creative" style={{ fontSize: 15, padding: '13px 28px' }}>
              <span>Read the Story</span>
              <span>→</span>
            </Link>
            <Link to="/#about" className="btn btn-outline" style={{ fontSize: 15, padding: '13px 28px' }}>
              About Me
            </Link>
          </div>

          {/* Quick stats */}
          <div style={{
            display: 'flex',
            gap: 40,
            flexWrap: 'wrap',
            marginTop: 64,
            paddingTop: 40,
            borderTop: '1px solid var(--border)',
            animation: 'fadeInUp 0.8s ease 0.55s both',
          }}>
            {[
              { value: '1.6K+', label: 'GitHub Stars', color: 'var(--tech-400)' },
              { value: '15+', label: 'Years in Data', color: 'var(--tech-400)' },
              { value: '5', label: 'ArXiv Papers', color: 'var(--tech-400)' },
              { value: '1', label: 'Debut Novel', color: 'var(--creative-400)' },
            ].map(s => (
              <div key={s.label}>
                <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Image (Desktop only) */}
        <div className="hero-image-wrapper" style={{
          position: 'relative',
          width: '450px',
          height: '450px',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 0 100px rgba(59,130,246,0.2), 0 0 80px rgba(245,158,11,0.1)',
          animation: 'float 6s ease-in-out infinite, fadeIn 1.2s ease 0.6s both',
          border: '1px solid rgba(255,255,255,0.05)',
          display: 'none',
        }}>
          <img src="/hero-bg.png" alt="Data Science and Fiction" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--bg-void) 0%, transparent 20%, transparent 80%, var(--bg-void) 100%)' }}></div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute',
        bottom: 32,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        animation: 'fadeIn 1.2s ease 1s both',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <div style={{
          width: 1,
          height: 40,
          background: 'linear-gradient(to bottom, var(--text-muted), transparent)',
          animation: 'float 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        .achieve-card {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 10px;
          cursor: default;
          transition: all 0.25s ease;
          position: relative;
        }
        .achieve-card.tech {
          background: rgba(59, 130, 246, 0.06);
          border: 1px solid rgba(59, 130, 246, 0.18);
        }
        .achieve-card.tech:hover {
          background: rgba(59, 130, 246, 0.13);
          border-color: rgba(59, 130, 246, 0.4);
          box-shadow: 0 0 18px rgba(59, 130, 246, 0.2);
          transform: translateY(-1px);
        }
        .achieve-card.creative {
          background: rgba(245, 158, 11, 0.06);
          border: 1px solid rgba(245, 158, 11, 0.18);
        }
        .achieve-card.creative:hover {
          background: rgba(245, 158, 11, 0.13);
          border-color: rgba(245, 158, 11, 0.4);
          box-shadow: 0 0 18px rgba(245, 158, 11, 0.2);
          transform: translateY(-1px);
        }
        .achieve-icon {
          font-size: 14px;
          flex-shrink: 0;
        }
        .achieve-metric {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.02em;
          white-space: nowrap;
        }
        .achieve-card.tech .achieve-metric { color: var(--tech-300); }
        .achieve-card.creative .achieve-metric { color: var(--creative-300); }
        .achieve-label {
          font-family: var(--font-sans);
          font-size: 11px;
          color: var(--text-muted);
          white-space: nowrap;
          padding-left: 6px;
          border-left: 1px solid rgba(255,255,255,0.08);
        }

        @media (min-width: 1024px) {
          .hero-image-wrapper { display: block !important; }
        }
      `}</style>
    </section>
  );
}
