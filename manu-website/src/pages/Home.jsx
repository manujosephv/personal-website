import { useEffect, useRef } from 'react'
import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import Pathways from '../components/Pathways.jsx'
import Speaking from '../components/Speaking.jsx'
import Contact from '../components/Contact.jsx'
import SideNav from '../components/SideNav.jsx'

const homeSections = [
  { id: 'home',     label: '00' },
  { id: 'about',    label: '01' },
  { id: 'pathways', label: '02' },
  { id: 'speaking', label: '03' },
  { id: 'contact',  label: '04' },
]

export default function Home() {
  const wrapperRef = useRef(null)
  const animRef = useRef(false)
  const currentRef = useRef(0)
  const dragRef = useRef(0)
  const snapTimeout = useRef(null)

  useEffect(() => {
    // Determine screen height for math
    document.documentElement.style.setProperty('--vh', window.innerHeight);

    // Initial triggers for the first section
    const sectionsList = wrapperRef.current?.querySelectorAll('.section') || []
    if (sectionsList[0]) sectionsList[0].classList.add('in-view')

    const updateTransform = (withTransition = false) => {
      if (!wrapperRef.current) return;
      const el = wrapperRef.current;
      if (withTransition) {
        el.style.transition = 'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)';
      } else {
        el.style.transition = 'none';
      }
      
      const vhOffset = currentRef.current * window.innerHeight;
      const totalOffset = vhOffset + dragRef.current;
      
      el.style.transform = `translateY(-${totalOffset}px)`;
      document.documentElement.style.setProperty('--scroll-raw', totalOffset);
    };

    const goToSection = (index) => {
      if (index < 0 || index >= homeSections.length) {
        // Snap back if out of bounds
        dragRef.current = 0;
        updateTransform(true);
        return;
      }

      animRef.current = true;
      currentRef.current = index;
      dragRef.current = 0;
      updateTransform(true);

      // Handle intersection observers manually here since we bypass native scroll
      sectionsList.forEach((s, i) => {
        if (i === index) {
          s.classList.add('in-view')
        } else {
          // Delay removal so it slides out visibly before resetting
          setTimeout(() => {
            s.classList.remove('in-view')
          }, 850)
        }
      })

      setTimeout(() => {
        animRef.current = false;
      }, 850);
    };

    const handleWheel = (e) => {
      e.preventDefault(); // Stop native scrolling entirely
      if (animRef.current) return; // Ignore input while transitioning

      // Extremely high artificial resistance (10% of trackpad movement)
      const resistance = 0.12; 
      dragRef.current += (e.deltaY * resistance);

      const THRESHOLD = 65; // User must "drag" 65 virtual pixels to trigger snap

      // Restrict pull limits visually
      if (dragRef.current > 120) dragRef.current = 120;
      if (dragRef.current < -120) dragRef.current = -120;
      if (currentRef.current === 0 && dragRef.current < 0) dragRef.current = Math.max(dragRef.current, -20);
      if (currentRef.current === homeSections.length - 1 && dragRef.current > 0) dragRef.current = Math.min(dragRef.current, 20);

      updateTransform(false); // Move slightly with no transition

      // Check threshold crossing
      if (dragRef.current > THRESHOLD) {
        goToSection(currentRef.current + 1);
        return;
      } else if (dragRef.current < -THRESHOLD) {
        goToSection(currentRef.current - 1);
        return;
      }

      // If user stops scrolling before threshold, snap back to 0
      clearTimeout(snapTimeout.current);
      snapTimeout.current = setTimeout(() => {
        if (!animRef.current && dragRef.current !== 0) {
          dragRef.current = 0;
          updateTransform(true);
        }
      }, 120);
    };

    const handleTouchStart = (e) => {
      if (animRef.current) return;
      wrapperRef.current.touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      e.preventDefault(); // prevent native scroll
      if (animRef.current || !wrapperRef.current.touchStartY) return;
      
      const deltaY = wrapperRef.current.touchStartY - e.touches[0].clientY;
      const resistance = 0.3; // Less resistance for native touch
      dragRef.current = deltaY * resistance;

      const THRESHOLD = 80;

      if (currentRef.current === 0 && dragRef.current < 0) dragRef.current = Math.max(dragRef.current, -30);
      if (currentRef.current === homeSections.length - 1 && dragRef.current > 0) dragRef.current = Math.min(dragRef.current, 30);

      updateTransform(false);

      if (dragRef.current > THRESHOLD) {
        goToSection(currentRef.current + 1);
        wrapperRef.current.touchStartY = null;
      } else if (dragRef.current < -THRESHOLD) {
        goToSection(currentRef.current - 1);
        wrapperRef.current.touchStartY = null;
      }
    };

    const handleTouchEnd = () => {
      if (animRef.current || dragRef.current === 0) return;
      wrapperRef.current.touchStartY = null;
      dragRef.current = 0;
      updateTransform(true); // Snap back
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    // Initialize parallax css variables immediately
    updateTransform(false);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      clearTimeout(snapTimeout.current);
    }
  }, [])

  return (
    <>
      <SideNav sections={homeSections} />
      <main className="fullpage-wrapper">
        <div className="sections-container" ref={wrapperRef}>
          <section id="home"     className="section"><Hero /></section>
          <section id="about"    className="section"><About /></section>
          <section id="pathways" className="section"><Pathways /></section>
          <section id="speaking" className="section"><Speaking /></section>
          <section id="contact"  className="section"><Contact /></section>
        </div>
      </main>
    </>
  )
}
