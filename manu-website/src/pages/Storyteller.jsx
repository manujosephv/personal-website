import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Author from '../components/Author.jsx';
import Nav from '../components/Nav.jsx';

export default function Storyteller() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Nav />
      <main style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>

      <div style={{ paddingBottom: '40px' }} id="author">
        <Author />
      </div>
      
    
    </main>
    </>
  );
}
