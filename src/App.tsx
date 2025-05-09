import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import About from './pages/About';

const App = () => {
  return (
    
    <Router  basename="/PCMS">
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Catalog" element={<Catalog />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;