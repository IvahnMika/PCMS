import {NavButton, HandleClick} from '../functions/button';
import '../index.css';
import './css/header.css';
import { useNavigate } from 'react-router-dom';

function Header() {
    {
        const navigate = useNavigate();
        
        
            const { isVisible, toggleDiv } = HandleClick();

    return (
            
        <header>

          <div className = "header"> 
                  <div className="header_nav">
                        <div className = "header_btns hdr.home">
                                <button  className = "header_btns" onClick={() => NavButton(navigate , '/Home')}>
                                    Home
                                </button>
                        </div>
    
                        <div className = "header_btns hdr.catalog">
                                <button  className = "header_btns" onClick={() => NavButton(navigate , '/Catalog')}>
                                Catalog
                                </button>
                        </div>

                        <div className = "header_btns hdr.about">
                                <button  className = "header_btns" onClick={() => NavButton(navigate , '/About')}>
                                About
                                </button>
                        </div>
  
                  </div>
              </div>
  
              <div className="header_small">
                  <div className = "hdr.home">
                  <span>
                  PCMS
                  </span>
                  </div>
  
                  <button className = "sidebar_btn"  onClick={toggleDiv}></button>
                  {isVisible && (
       
                    <div className = "sidebar" >
                        <div className = "sidebar_btns syd.home" >
                            <button className = "sidebar_btns"  onClick={() => NavButton(navigate , '/Home')}>
                                Home
                            </button>
                        </div>
                        <div className = "sidebar_btns syd.catalog">
                            <button className = "sidebar_btns"  onClick={() => NavButton(navigate , '/Catalog')}>
                                Catalog
                            </button>
                        </div>
                        <div className = "sidebar_btns syd.about">
                            <button  className = "sidebar_btns" onClick={() => NavButton(navigate , '/About')}>
                                About
                            </button>
                        </div>
                    </div>
                  )}
             
                  
              </div>
  
              
  
          </header>
    );
  
}
}

export default Header;