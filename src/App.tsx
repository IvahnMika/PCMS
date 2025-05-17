import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import About from './pages/About';
import AdminLogin from './pages/AdminLogin';
import AdminPage from './pages/AdminPage';
import CarInfo from './pages/CarInfo';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Home" replace />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Catalog" element={<Catalog />} />
        <Route path="/About" element={<About />} />
        <Route path="/CarInfo" element={<CarInfo />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};

export default App;