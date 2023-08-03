import React from 'react';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faPhone,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faYoutube,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

import Button from 'components/Button';
import './contact.scss';

const Contact = () => {
  return (
    <main className='contact'>
      <section className='banner'>
        <div className='content'>
          <div className='information'>
            <div className='head'>
              <h1>Contact Us</h1>
              <p>
                Feel free to reach out to us anytime. We value professionalism
                and a friendly approach. Contact us directly or fill out the
                form, and our dedicated team will promptly assist you.
              </p>
            </div>
            <div className='address column'>
              <FontAwesomeIcon
                icon={faLocationDot}
                fixedWidth
                className='contact-icon'
              />
              <div>
                <div>Address</div>
                <p>123 Fifth Avenue, NY 126004, New York, USA.</p>
              </div>
            </div>
            <hr />
            <div className='phone-number column'>
              <FontAwesomeIcon
                icon={faPhone}
                fixedWidth
                className='contact-icon'
              />
              <div>
                <div>Call Us</div>
                <p>+1 123 456 78 90</p>
              </div>
            </div>
            <hr />
            <div className='email column'>
              <FontAwesomeIcon
                icon={faEnvelope}
                fixedWidth
                className='contact-icon'
              />
              <div>
                <div>Email Us</div>
                <p>hello@example.com</p>
              </div>
            </div>
            <hr />
            <div className='sns'>
              <div>Follow us</div>
              <FontAwesomeIcon
                icon={faTwitter}
                fixedWidth
                className='sns-icon'
              />
              <FontAwesomeIcon
                icon={faInstagram}
                fixedWidth
                className='sns-icon'
              />
              <FontAwesomeIcon
                icon={faFacebook}
                fixedWidth
                className='sns-icon'
              />
              <FontAwesomeIcon
                icon={faYoutube}
                fixedWidth
                className='sns-icon'
              />
            </div>
          </div>
          <div className='form'>
            <div>
              <label htmlFor='guest-name'>
                Name <span>*</span>
              </label>
              <input type='text' id='guest-name' />
            </div>
            <div>
              <label htmlFor='guest-email'>
                Email <span>*</span>
              </label>
              <input type='email' id='guest-email' />
            </div>
            <div>
              <label htmlFor='title'>
                Title <span>*</span>
              </label>
              <input type='text' id='title' />
            </div>
            <div>
              <label htmlFor='guest-message'>
                Message <span>*</span>
              </label>
              <textarea
                name='guest-message'
                id='guest-message'
                rows='10'
                placeholder='Please fill out any questions or suggestions.'
              ></textarea>
            </div>
            <Button cx='submit-btn'>Send Message</Button>
          </div>
        </div>
      </section>
      <section className='map'>
        <iframe
          title='This is a google map.'
          src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d33243.5258847339!2d120.90605874480298!3d23.854099662021788!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3468d5e076ee0005%3A0xec17a6fd5312a528!2sSun%20Moon%20Lake!5e0!3m2!1sen!2stw!4v1691055180134!5m2!1sen!2stw'
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        ></iframe>
      </section>
      <section className='subscription'>
        <div>SUBSCRIBE</div>
        <h3>All Access Membership</h3>
        <p>Unleash the Secrets of Knowledge, Subscribe to our Newsletter!</p>
        <input type='text' placeholder='Please enter your email' />
        <Button>Subscribe & Save</Button>
      </section>
    </main>
  );
};

export default Contact;
