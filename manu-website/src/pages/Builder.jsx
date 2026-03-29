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
      <main style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>

      <div style={{ paddingBottom: '80px' }} id="data-science">
        <DataScience />
      </div>
    </main>
    </>
  );
}
