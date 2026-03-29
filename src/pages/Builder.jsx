import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataScience from '../components/DataScience.jsx';
import Nav from '../components/Nav.jsx';

export default function Builder() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Nav />
      <main style={{ minHeight: '100vh', paddingTop: 'clamp(80px, 12vh, 120px)', paddingBottom: 'clamp(60px, 10vh, 100px)' }}>

      <div style={{ paddingBottom: '80px' }} id="data-science">
        <DataScience />
      </div>
    </main>
    </>
  );
}
