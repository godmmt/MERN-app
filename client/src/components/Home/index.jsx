import React from 'react';
import bannerVideo1 from 'assets/video/banner-video-1.mp4';
import bannerVideo2 from 'assets/video/banner-video-2.mp4';
import './home.scss';
import Button from 'components/Button';

const Home = () => {
  return (
    <main className='home'>
      <section className='banner'>
        <div className='slogan'>
          <h1>Transform Your Life through Online Learning and Education!</h1>
          <p>
            Welcome to our online platform for learning programming courses! We
            are dedicated to providing a high-quality, flexible, and inspiring
            learning experience that allows you to unleash your coding
            potential.
          </p>
          <div className='action'>
            <Button>Start Course</Button>
            <Button>View All Courses</Button>
          </div>
        </div>

        <div className='video-container'>
          <video muted controls preload>
            <source src={bannerVideo2} />
            <source src={bannerVideo1} />
          </video>
        </div>
      </section>

      <section className='roleIntro'>
        <div className='role'>
          <div className='student'>
            <h2>As a student</h2>
            <p>
              Students can register in courses they like. This website is for
              practice purpose only, so please do not provide any personal
              information, such as credit card numbers.
            </p>
            <button type='button'>Login or Register Now</button>
          </div>
          <div className='instructor'>
            <h2>As an Instructor</h2>
            <p>
              You can become an instructor by registering as one, and start
              making online courses. This website is for practice purpose only,
              so please do not provide any personal information, such as credit
              card numbers.
            </p>
            <button type='button'>Login or Register Now</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
