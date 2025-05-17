import '../index.css';
import './css/footer.css';
import { NavButton } from '../functions/button';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer-root">
      <div className="footer-container">
        <div className="footer-brand">
          <button className="footer-title" onClick={() => NavButton(navigate, '/Home')}>
            PCMS
          </button>
        </div>
        <div className="footer-section">
          <span className="footer-section-title">Catalog</span>
          <ul className="footer-list">
            <li><button className="footer-link" onClick={() => NavButton(navigate, '/Catalog')}>All Cars</button></li>
            <li><span className="footer-list-label">Sedans</span></li>
            <li><span className="footer-list-label">Hatchbacks</span></li>
            <li><span className="footer-list-label">SUVs</span></li>
            <li><span className="footer-list-label">Coupes</span></li>
          </ul>
        </div>
        <div className="footer-section">
          <span className="footer-section-title">About</span>
          <ul className="footer-list">
            <li><button className="footer-link" onClick={() => NavButton(navigate, '/About')}>About Us</button></li>
            <li><span className="footer-list-label">Our Email</span></li>
            <li><span className="footer-list-label">0951-524-2046</span></li>
            <li><span className="footer-list-label">Check Our Twitter</span></li>
            <li><span className="footer-list-label">Check Our Facebook</span></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copyright">&copy; {new Date().getFullYear()} PCMS. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;