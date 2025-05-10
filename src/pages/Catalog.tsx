import '../index.css';
import { AutoScroll, HtmlLoader } from '../index1.js';
import { useNavigate } from 'react-router-dom';
import Layout from '../layouts/Layout'

function Catalog() {
        const navigate = useNavigate();

    return (
        <Layout>
          <main>
                <div className="main_div" id="main">
                  <div className='about_main_div_wrapper'>
                        <div className="main_div_card" id="card1">
                          </div>
                        <div className="main_div_card">
                          </div>
                        <div className="main_div_card">
                          </div>
                  </div>
              </div>
          </main>
        </Layout>
    );
  }

export default Catalog;