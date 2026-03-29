import { useEffect, useRef, useState } from 'react'
import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import Pathways from '../components/Pathways.jsx'
import Speaking from '../components/Speaking.jsx'
import Contact from '../components/Contact.jsx'
import SideNav from '../components/SideNav.jsx'
import Nav from '../components/Nav.jsx'

const homeSections = [
  { id: 'home',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'pathways', label: 'Two Paths' },
  { id: 'speaking', label: 'Media' },
  { id: 'contact',  label: 'Contact' },
]

export default function Home() {
  const wrapperRef = useRef(null)
  const animRef = useRef(false)
  const currentRef = useRef(0) // Logic-driving ref
  const [activeIndex, setActiveIndex] = useState(0) // UI-driving state
  const dragRef = useRef(0)
  const snapTimeout = useRef(null)
  const goToSectionRef = useRef(null)

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
        dragRef.current = 0;
        updateTransform(true);
        return;
      }

      animRef.current = true;
      currentRef.current = index;
      setActiveIndex(index);
      dragRef.current = 0;
      updateTransform(true);

      sectionsList.forEach((s, i) => {
        if (i === index) {
          s.classList.add('in-view')
        } else {
          setTimeout(() => {
            s.classList.remove('in-view')
          }, 850)
        }
      })

      setTimeout(() => {
        animRef.current = false;
      }, 850);
    };
    
    // Expose goToSection to component scope via Ref
    goToSectionRef.current = goToSection;

    const handleWheel = (e) => {
      e.preventDefault();
      if (animRef.current) return;

      const resistance = 0.12; 
      dragRef.current += (e.deltaY * resistance);

      const THRESHOLD = 65;

      if (dragRef.current > 120) dragRef.current = 120;
      if (dragRef.current < -120) dragRef.current = -120;
      if (currentRef.current === 0 && dragRef.current < 0) dragRef.current = Math.max(dragRef.current, -20);
      if (currentRef.current === homeSections.length - 1 && dragRef.current > 0) dragRef.current = Math.min(dragRef.current, 20);

      updateTransform(false);

      if (dragRef.current > THRESHOLD) {
        goToSection(currentRef.current + 1);
        return;
      } else if (dragRef.current < -THRESHOLD) {
        goToSection(currentRef.current - 1);
        return;
      }

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
      e.preventDefault();
      if (animRef.current || !wrapperRef.current.touchStartY) return;
      
      const deltaY = wrapperRef.current.touchStartY - e.touches[0].clientY;
      const resistance = 0.3;
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
      updateTransform(true);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    const handleHash = () => {
      const hash = window.location.hash.replace('#', '')
      const idx = homeSections.findIndex(s => s.id === hash)
      if (idx !== -1 && idx !== currentRef.current) {
        goToSection(idx)
      }
    }

    window.addEventListener('hashchange', handleHash)

    if (window.location.hash) {
      setTimeout(() => handleHash(), 150)
    }

    updateTransform(false);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('hashchange', handleHash);
      clearTimeout(snapTimeout.current);
    }
  }, [])

  return (
    <>
      <Nav 
        sections={homeSections} 
        activeIndex={activeIndex} 
        onNavigate={(idx) => goToSectionRef.current?.(idx)} 
      />
      <SideNav sections={homeSections} activeIndex={activeIndex} />
      <main className="fullpage-wrapper">
        <div className="sections-container" ref={wrapperRef}>
          <section data-id="home"     className="section"><Hero /></section>
          <section data-id="about"    className="section"><About /></section>
          <section data-id="pathways" className="section"><Pathways /></section>
          <section data-id="speaking" className="section"><Speaking /></section>
          <section data-id="contact"  className="section"><Contact /></section>
        </div>
      </main>
    </>
  )
}
