import React from 'react';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faYoutube, faGithub } from '@fortawesome/free-brands-svg-icons';

import aboutVideo1 from 'assets/video/about-video1.mp4';
import Subscription from 'components/Subscription';
import { instructorCards } from 'config/about.config';
import './about.scss';

const About = () => {
  return (
    <main className='about'>
      <section className='banner'>
        <div className='introduction'>
          <h1>About Us</h1>
          <p>
            Unlock the boundless world of programming through our extensive selection of online courses, thoughtfully designed to cater to your unique
            programming aspirations and goals. Embark on an enriching journey that encompasses a diverse spectrum of programming languages, allowing
            you to delve deep into the realm of code. Under the guidance of our seasoned instructors, you'll not only learn but also master the art of
            programming, honing your skills to perfection. Join us in this immersive educational experience, where the possibilities in the world of
            coding are limitless, and your potential knows no bounds.
          </p>
          <div className='video-container'>
            <video autoPlay muted loop preload='true'>
              <source src={aboutVideo1} />
            </video>
          </div>
        </div>
      </section>
      <section className='main-content'>
        <div className='founder-content'>
          <FontAwesomeIcon icon={faQuoteLeft} className='quote-icon' />
          <p>
            As the founder of this programming language course website, my vision was to create a platform that empowers learners to master diverse
            coding skills. Witnessing the growth of aspiring developers, honing their craft through our courses, brings immense joy. It's inspiring to
            see learners from all backgrounds unlocking their potential and embarking on exciting coding journeys. Our commitment is to continue
            providing top-notch courses, cultivating a vibrant community of learners, and making coding education accessible to all. Together, we
            thrive in the world of programming possibilities.
          </p>
          <div className='divider'>
            <hr />
          </div>
          <h5 className='founder-name'>Daniel Brown</h5>
          <div className='founder-title'>Founder</div>
        </div>
        <div className='instructors'>
          <div className='card'></div>
          <div className='instructors-header'>
            <h6>INDUSTRY EXPERTS</h6>
            <h2>Meet The Instructors</h2>
          </div>
          <div className='instructors-cards'>
            {instructorCards.map((instructorCard, index) => (
              <div className='card' key={`${instructorCard.username}-${index}`}>
                <div className='instructor-img'>
                  <img src={instructorCard.imgSrc} alt={instructorCard.imgAlt} />
                </div>
                <div className='instructor-intro'>
                  <h5>{instructorCard.username}</h5>
                  <p>{instructorCard.category}</p>
                </div>
                <div className='instructor-contact'>
                  <FontAwesomeIcon icon={faFacebook} fixedWidth className='icon' />
                  <FontAwesomeIcon icon={faYoutube} fixedWidth className='icon' />
                  <FontAwesomeIcon icon={faGithub} fixedWidth className='icon' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Subscription />
    </main>
  );
};

export default About;
