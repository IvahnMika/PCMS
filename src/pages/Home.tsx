import '../index.css';
import './css/Home.css';
import { AutoScroll, HtmlLoader } from '../index1.js';
import { useNavigate } from 'react-router-dom';
import {NavButton} from '../functions/button';
import Layout from '../layouts/Layout'

function Home() {
    {
        const navigate = useNavigate();
      

    return (

      <Layout>
              <div className = "main_div" id = "main">
                  <div className='main_div_wrapper'>
                      <AutoScroll>
                          <div className = "main_div_card card1">
                            <button className = "navs" onClick={() => NavButton(navigate , '/Home')}>

                            </button>
                          </div>
                          <div className = "main_div_card card2">
                            <button className = "navs" onClick={() => NavButton(navigate , '/Catalog')}>

                            </button>
                          </div>
                          <div className = "main_div_card card3">
                            <button className = "navs" onClick={() => NavButton(navigate , '/About')}>

                            </button>
                          </div>
                      </AutoScroll>
                  </div>
                  
              </div>
              </Layout>    
        
    );
  }
}

export default Home;