import React from 'react';
import logo from 'assets/images/logo.png';
import twitter from 'assets/images/twitter.png';
import instagram from 'assets/images/instagram.png';
import facebook from 'assets/images/facebook.png';
import youtube from 'assets/images/youtube.png';
import './footer.scss';

const Footer = () => {
  return (
    <footer>
      <section>
        <div className='logo-area'>
          <div className='logo'>
            <img src={logo} alt='logo' />
          </div>
          <div className='short-description'>
            <p>
              This website is for practice purpose only, so please do not
              provide any personal information, such as credit card numbers.
            </p>
          </div>
          <div className='contact-icons'>
            <div className='twitter'>
              <a href='https://twitter.com/' target='_blank' rel='noreferrer'>
                <img title='twitter' src={twitter} alt='twitter' />
              </a>
            </div>
            <div className='instagram'>
              <a
                href='https://www.instagram.com/'
                target='_blank'
                rel='noreferrer'
              >
                <img title='instagram' src={instagram} alt='instagram' />
              </a>
            </div>
            <div className='facebook'>
              <a
                href='https://www.facebook.com/'
                target='_blank'
                rel='noreferrer'
              >
                <img title='facebook' src={facebook} alt='facebook' />
              </a>
            </div>
            <div className='youtube'>
              <a
                href='https://www.youtube.com/'
                target='_blank'
                rel='noreferrer'
              >
                <img title='youtube' src={youtube} alt='youtube' />
              </a>
            </div>
          </div>
        </div>
        <div className='topics'>
          <h4>Topics</h4>
          <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>React</li>
            <li>Node.js</li>
          </ul>
        </div>
        <div className='get-in-touch'>
          <h4>Get In Touch</h4>
          <p>123 Fifth Ave, New York, NY 12004, USA.</p>
          <p>+1 123 456 78 90</p>
          <p>mail@example.com</p>
        </div>
      </section>
      <div className='copyright'>&copy; {new Date().getFullYear()} Ming</div>
    </footer>
  );
};

export default Footer;
