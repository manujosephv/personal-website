import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Builder from './pages/Builder.jsx'
import Storyteller from './pages/Storyteller.jsx'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/storyteller" element={<Storyteller />} />
      </Routes>
      <Footer />
    </Router>
  )
}

