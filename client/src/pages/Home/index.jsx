import React from 'react';
import { useNavigate } from 'react-router-dom';
// React Slick
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHourglassHalf } from '@fortawesome/free-regular-svg-icons';
import { faCircleRight } from '@fortawesome/free-regular-svg-icons';
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
import user1 from 'assets/images/user1.jpg';
import user2 from 'assets/images/user2.jpg';
import user3 from 'assets/images/user3.jpg';
import user4 from 'assets/images/user4.jpg';
import user5 from 'assets/images/user5.jpg';
import user6 from 'assets/images/user6.jpg';
import user7 from 'assets/images/user7.jpg';
import user8 from 'assets/images/user8.jpg';
import './home.scss';

const circleIcon = <FontAwesomeIcon icon={faCircle} className='circle-icon' />;
const circleCheckIcon = (
  <FontAwesomeIcon icon={faCircleCheck} className='circle-check-icon' />
);
const userIcon = <FontAwesomeIcon icon={faUser} className='user-icon' />;
const hourglassIcon = (
  <FontAwesomeIcon icon={faHourglassHalf} className='hourglass-icon' />
);
const rightArrowIcon = (
  <FontAwesomeIcon icon={faCircleRight} className='right-arrow-icon' />
);
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2, // 頁面顯示數目
  slidesToScroll: 1, // 一次滾動數目
  autoplay: true,
  autoplaySpeed: 5000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
  ],
};

const Home = () => {
  const navigate = useNavigate();
  const handleClickAllCourses = () => {
    navigate('/all-courses');
  };
  const handleClickHome = () => {
    navigate('/');
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
            <h5>
              I found this tutorial website to be very user-friendly and it has
              been incredibly helpful for me. The step-by-step instructions and
              clear explanations have made it easy for me to grasp complex
              concepts. I appreciate the variety of topics covered, which has
              allowed me to learn and explore different areas of interest.
              Overall, this website has been an invaluable resource for my
              learning journey.
            </h5>
            <div className='feedback-content-footer'>
              <div className='left'>
                <div className='feedback-name'>Elena Miles</div>
                <div className='role'>Student</div>
              </div>
              <div className='right' onClick={handleClickHome}>
                <div>Read All Reviews</div>
                <div>{rightArrowIcon}</div>
              </div>
            </div>
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
            <div className='card-content'>
              <h6>FRONT END</h6>
              <h5>HTML 5 Web Component Fundamentals</h5>
              <div className='level-and-duration'>
                <div className='level'>{userIcon}Beginner</div>
                <div className='duration'>{hourglassIcon}2h 24m</div>
              </div>
            </div>
          </div>
          <div className='card'>
            <div className='card-img'>
              <img src={computer3} alt='computer3' />
            </div>
            <div className='card-content'>
              <h6>FRONT END</h6>
              <h5>Mastering CSS 3 Flexbox With Real World Projects</h5>
              <div className='level-and-duration'>
                <div className='level'>{userIcon}Beginner</div>
                <div className='duration'>{hourglassIcon}3h 18m</div>
              </div>
            </div>
          </div>
          <div className='card'>
            <div className='card-img'>
              <img src={computer4} alt='computer4' />
            </div>
            <div className='card-content'>
              <h6>FRONT END</h6>
              <h5>Full Stack Web Development with React Hooks and Redux</h5>
              <div className='level-and-duration'>
                <div className='level'>{userIcon}Intermediate</div>
                <div className='duration'>{hourglassIcon}4h 36m</div>
              </div>
            </div>
          </div>
        </section>
        <section className='testimonial'>
          <div className='testimonial-head'>
            <h6>TESTIMONIALS</h6>
            <h2>Trusted by Thousand of Students and Tutors</h2>
            <Button>Start Learning</Button>
          </div>
          <Slider {...settings} className='testimonial-carousel'>
            <div className='testimonial-card'>
              <div className='testimonial-card-img'>
                <img src={user1} alt='user1' />
              </div>
              <p>
                This website has been an invaluable resource in my journey to
                learn HTML, CSS, and JavaScript. It has provided me with
                comprehensive tutorials and practical examples, making the
                learning process efficient and enjoyable. Grateful for the
                knowledge gained here!
              </p>
              <div>EMMA HART</div>
            </div>
            <div className='testimonial-card'>
              <div className='testimonial-card-img'>
                <img src={user2} alt='user2' />
              </div>
              <p>
                This website has been a guiding light on my journey to learn
                React. It has provided me with clarity and direction, making the
                learning process enjoyable and rewarding. Grateful for the
                valuable resources and support!
              </p>
              <div>ISABELLA BROWN</div>
            </div>
            <div className='testimonial-card'>
              <div className='testimonial-card-img'>
                <img src={user3} alt='user3' />
              </div>
              <p>
                As a new PM in the software industry, this website has been an
                invaluable resource in deepening my understanding of
                software-related topics and equipping me with essential
                knowledge for my role.
              </p>
              <div>JUSTIN DOE</div>
            </div>
            <div className='testimonial-card'>
              <div className='testimonial-card-img'>
                <img src={user4} alt='user4' />
              </div>
              <p>
                This exceptional website has provided me with invaluable
                insights into the intricate workings of computers. With a wide
                array of courses to choose from, each worth having, it has been
                an enlightening journey of learning and growth.
              </p>
              <div>MIKE EDWARD</div>
            </div>
            <div className='testimonial-card'>
              <div className='testimonial-card-img'>
                <img src={user5} alt='user5' />
              </div>
              <p>
                I love this website! It's perfect for a 10-year-old like me.
                With my parents' guidance, I choose exciting courses that make
                learning super fun!
              </p>
              <div>LILY ANDERSON</div>
            </div>
            <div className='testimonial-card'>
              <div className='testimonial-card-img'>
                <img src={user6} alt='user6' />
              </div>
              <p>
                This website is amazing! It sparks my coding curiosity with a
                wide range of courses I adore exploring. Learning here is fun
                and empowers my coding journey!
              </p>
              <div>JACKSON SMITH</div>
            </div>
            <div className='testimonial-card'>
              <div className='testimonial-card-img'>
                <img src={user7} alt='user7' />
              </div>
              <p>
                This platform is a game-changer! As a career transitioner, I've
                gained invaluable guidance here. The diverse courses let me
                explore and discover the perfect programming language for me.
              </p>
              <div>EMILY JONES</div>
            </div>
            <div className='testimonial-card'>
              <div className='testimonial-card-img'>
                <img src={user8} alt='user8' />
              </div>
              <p>
                I found my passion here, never thought learning a programming
                language could be so fun and effortless. This platform offers a
                wide range of courses that cater to all levels, allowing me to
                explore and discover my interests. It's truly an amazing
                experience!
              </p>
              <div>JAMES TAYLOR</div>
            </div>
          </Slider>
        </section>
      </div>
    </main>
  );
};

export default Home;
