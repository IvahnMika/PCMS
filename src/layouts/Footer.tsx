
import '../index.css';
import './css/footer.css';
import {NavButton} from '../functions/button';
import { useNavigate } from 'react-router-dom';

function Footer() {

    const navigate = useNavigate();
    

    return (

            <footer>
              <div className = "footer">
                <div className = "footer_title">
                  
                  <button  className = "footer_btns fit-text" onClick={() => NavButton(navigate, '/Home')}>
                    PCMS
                  </button>
                  
                  
                </div>

                <div className = "footer_catalog">
                  <div className = "footer_catalog_title">
                        <button  className = "footer_btns font-bold paragraph" onClick={() => NavButton(navigate, '/Catalog')}>
                            Catalog
                        </button>
                  </div>
                  <div className = "footer_catalog_categories">
                    <table className = "footer_tables">
                          <tr>
                            <p  className = "paragraph1">
                              • Sedans
                            </p>
                          </tr>
                          <tr>
                            <p  className = "paragraph1">
                              • Hatchbacks
                            </p>
                          </tr>
                          <tr>
                            <p  className = "paragraph1">
                              •  SUVs
                            </p>
                          </tr>
                          <tr>
                            <p  className = "paragraph1">
                              •  Coupes
                            </p>
                          </tr> 
                        </table>
                  </div>
                </div>

                  <div className = "footer_about">
                    <div className = "footer_about_title">
                      <button  className = "footer_btns font-bold paragraph" onClick={() => NavButton(navigate, '/About')}>
                        About
                      </button>
                    </div>
                    <div className = "footer_about_links">
                      <table>
                        <tr>
                          <p className = 'paragraph1'>
                            • Our Email
                          </p>
                        </tr>
                        <tr>
                          <p className = 'paragraph1'>
                            • 0951-524-2046
                          </p>
                        </tr>
                        <tr>
                          <p className = 'paragraph1'>
                            •  Check Our Twitter
                          </p>
                        </tr>
                        <tr>
                          <p className = 'paragraph1'>
                            • Check Our Facebook
                          </p>
                        </tr>
                      </table>
                    </div>
                  </div>

              </div>
            </footer>

    );
}

export default Footer;