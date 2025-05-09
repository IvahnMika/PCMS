import '../index.css';
import './css/About.css';
import { AutoScroll, HtmlLoader } from '../index1.js';
import { useNavigate } from 'react-router-dom';
import Layout from '../layouts/Layout'
function About() {
    {
        const navigate = useNavigate();
      

    return (
        <Layout>
          <div className = "about_main_div" id = "main">
                  
                  <div className='about_main_div_wrapper'><AutoScroll>
                  
                          <div className = "about_main_div_card flex flex-col justify-between h-48 " id='card1'>
                              <h1 className = "heading">About Us</h1>
                              <p  className = "paragraph">We’re driven by a passion for innovation, performance, and precision. Our mission is to redefine mobility by creating cutting-edge vehicles that combine advanced technology, exceptional craftsmanship, and sustainability.  </p>
                          </div>
                          
                          <div className = "about_main_div_card flex flex-col justify-between h-48 " id='card2'>
                              <h1 className = "heading">Leader</h1>
                              <p className = "paragraph">Rodel Lingcopines</p>
                          </div>

                          <div className = "about_main_div_card flex flex-col justify-between h-48 " id='card3'>
                              <h1  className = "heading" >Member 1</h1>
                              <p className = "paragraph">Jhan Russel Lina</p>
                          </div>

                          <div className = "about_main_div_card flex flex-col justify-between h-48 " id='card4'>
                              <h1  className = "heading">Member 2</h1>
                              <p className = "paragraph">Frankjohn Listangco</p>
                          </div>

                          <div className = "about_main_div_card flex flex-col justify-between h-48 " id='card5'>
                              <h1  className = "heading">Member 3</h1>
                              <p  className = "paragraph">Ivahn Mika Lobrio</p>
                          </div>

                          <div className = "about_main_div_card flex flex-col justify-between h-48 " id='card6'>
                              <h1  className = "heading"> Member 4</h1>
                              <p className = "paragraph">Jefferson Lopez</p>
                          </div>
                          
                    </AutoScroll></div>
            </div>
        </Layout>
       
    );
  }
}

export default About;