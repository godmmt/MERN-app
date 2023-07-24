import React from 'react';
import { useNavigate } from 'react-router-dom';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHourglassHalf } from '@fortawesome/free-regular-svg-icons';
import Button from 'components/Button';
import bannerVideo1 from 'assets/video/banner-video-1.mp4';
import bannerVideo2 from 'assets/video/banner-video-2.mp4';
import html5Icon from 'assets/images/html5-icon.svg';
import css3Icon from 'assets/images/css3-icon.svg';
import javascriptIcon from 'assets/images/javascript-icon.svg';
import nodejsIcon from 'assets/images/nodejs-icon.svg';
import reactIcon from 'assets/images/react-icon.svg';
import happyStudent from 'assets/images/happy-student.jpg';
import computer from 'assets/images/computer.jpg';
import computer2 from 'assets/images/computer2.jpg';
import computer3 from 'assets/images/computer3.jpg';
import computer4 from 'assets/images/computer4.jpg';
import './home.scss';

const circleIcon = <FontAwesomeIcon icon={faCircle} className='circle-icon' />;
const circleCheckIcon = (
  <FontAwesomeIcon icon={faCircleCheck} className='circle-check-icon' />
);
const userIcon = <FontAwesomeIcon icon={faUser} className='user-icon' />;
const hourglassIcon = (
  <FontAwesomeIcon icon={faHourglassHalf} className='hourglass-icon' />
);

const Home = () => {
  const navigate = useNavigate();
  const handleClickAllCourses = () => {
    navigate('/all-courses');
  };

  return (
    <main className='home'>
      <section className='banner'>
        <div className='introduction'>
          <div className='slogan'>
            <h1>Transform Your Life through Online Learning and Education!</h1>
            <p>
              Welcome to our online platform for learning programming courses!
              We are dedicated to providing a high-quality, flexible, and
              inspiring learning experience that allows you to unleash your
              coding potential.
            </p>
            <div className='action'>
              <Button>Start Course</Button>
              <Button onClick={handleClickAllCourses}>View All Courses</Button>
            </div>
          </div>

          <div className='video-container'>
            <video autoPlay muted preload='true'>
              <source src={bannerVideo2} />
              <source src={bannerVideo1} />
            </video>
          </div>
        </div>
      </section>

      <div className='content-container'>
        <section className='gallery'>
          <div>
            <img src={html5Icon} alt='html5' />
          </div>
          <div>
            <img src={css3Icon} alt='css3' />
          </div>
          <div>
            <img src={javascriptIcon} alt='javascript' />
          </div>
          <div>
            <img src={reactIcon} alt='react' />
          </div>
          <div>
            <img src={nodejsIcon} alt='nodejs' />
          </div>
        </section>
        <section className='feedback'>
          <div className='feedback-photo'>
            <img src={happyStudent} alt='userPhoto' />
          </div>
          <div className='feedback-content'>
            <h6>WHAT OUR HAPPY STUDENT SAY</h6>
            <p>
              I found this tutorial website to be very user-friendly and it has
              been incredibly helpful for me. The step-by-step instructions and
              clear explanations have made it easy for me to grasp complex
              concepts. I appreciate the variety of topics covered, which has
              allowed me to learn and explore different areas of interest.
              Overall, this website has been an invaluable resource for my
              learning journey.
            </p>
          </div>
        </section>
        <section className='featured-course'>
          <div className='featured-course-img'>
            <img src={computer} alt='computer' />
          </div>
          <div className='featured-course-content'>
            <h6>{circleIcon}FEATURED COURSE</h6>
            <h2>Getting Started With Python 3 for Beginner</h2>
            <p>
              Jumpstart your Python journey with our beginner-friendly course,
              "Getting Started With Python 3"!
            </p>
            <div className='list'>
              <div className='list-left'>
                <p>{circleCheckIcon}Fundamental</p>
                <p>{circleCheckIcon}Input and output</p>
              </div>
              <div className='list-right'>
                <p>{circleCheckIcon}Conditional branching</p>
                <p>{circleCheckIcon}8+ more lessons</p>
              </div>
            </div>
            <Button cx='start-course'>Start Course</Button>
          </div>
        </section>
        <section className='courses-cards'>
          <div className='card'>
            <div className='card-img'>
              <img src={computer2} alt='computer2' />
            </div>
            <h6>FRONT END</h6>
            <h5>HTML 5 Web Component Fundamentals</h5>
            <div className='level'>{userIcon}Beginner</div>
            <div className='duration'>{hourglassIcon}2h 24m</div>
          </div>
          <div className='card'>
            <div className='card-img'>
              <img src={computer3} alt='computer3' />
            </div>
            <h6>FRONT END</h6>
            <h5>Mastering CSS 3 Flexbox With Real World Projects</h5>
            <div className='level'>{userIcon}Beginner</div>
            <div className='duration'>{hourglassIcon} 3h 18m</div>
          </div>
          <div className='card'>
            <div className='card-img'>
              <img src={computer4} alt='computer4' />
            </div>
            <h6>FRONT END</h6>
            <h5>Full Stack Web Development with React Hooks and Redux</h5>
            <div className='level'>{userIcon}Intermediate</div>
            <div className='duration'>{hourglassIcon} 4h 36m</div>
          </div>
        </section>
        <section className='role-intro'>
          <div className='student'>
            <h2>As a student</h2>
            <p>
              Students can register in courses they like. This website is for
              practice purpose only, so please do not provide any personal
              information, such as credit card numbers.
            </p>
            <Button>Login or Register Now</Button>
          </div>
          <div className='instructor'>
            <h2>As an Instructor</h2>
            <p>
              You can become an instructor by registering as one, and start
              making online courses. This website is for practice purpose only,
              so please do not provide any personal information, such as credit
              card numbers.
            </p>
            <Button>Login or Register Now</Button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
