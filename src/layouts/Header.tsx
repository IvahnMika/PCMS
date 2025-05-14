import { NavButton, HandleClick } from '../functions/button';
import '../index.css';
import './css/header.css';
import { useNavigate } from 'react-router-dom';
import cartalogLogo from '../resources/imgs/carlogo32.png';

function Header() {
  const navigate = useNavigate();
  const { isVisible, toggleDiv } = HandleClick();

  return (
    <header className="header-root">
      <div className="header-container">
        <div className="header-brand" onClick={() => NavButton(navigate, '/Home')}>
          <img src={cartalogLogo} alt="PCMS Logo" className="header-logo" />
          <span className="header-title">PCMS</span>
        </div>
        <nav className="header-nav">
          <button className="header-link" onClick={() => NavButton(navigate, '/Home')}>Home</button>
          <button className="header-link" onClick={() => NavButton(navigate, '/Catalog')}>Catalog</button>
          <button className="header-link" onClick={() => NavButton(navigate, '/About')}>About</button>
        </nav>
        <button className="header-sidebar-toggle" onClick={toggleDiv} aria-label="Open sidebar">
          <span className="header-sidebar-icon" />
        </button>
      </div>
      {isVisible && (
        <div className="header-sidebar">
          <button className="sidebar-link" onClick={() => NavButton(navigate, '/Home')}>Home</button>
          <button className="sidebar-link" onClick={() => NavButton(navigate, '/Catalog')}>Catalog</button>
          <button className="sidebar-link" onClick={() => NavButton(navigate, '/About')}>About</button>
        </div>
      )}
    </header>
  );
}

export default Header;