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
import { ROUTER_PATH } from 'App';
import bannerVideo1 from 'assets/video/banner-video-1.mp4';
import bannerVideo2 from 'assets/video/banner-video-2.mp4';

import happyStudent from 'assets/images/happy-student.png';
import computer from 'assets/images/computer.jpg';
import { gallery, courseCards, userTestimonials } from 'config/home.config';
import './home.scss';

const circleCheckIcon = (
  <FontAwesomeIcon icon={faCircleCheck} className='circle-check-icon' />
);

const Home = () => {
  const navigate = useNavigate();
  const handleClickAllCourses = () => {
    navigate(ROUTER_PATH.allCourses);
  };
  const handleClickToTop = () => {
    // 導航到當前頁面的頂部
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              <Button onClick={handleClickToTop}>Start Course</Button>
              <Button onClick={handleClickAllCourses}>View All Courses</Button>
            </div>
          </div>

          <div className='video-container'>
            <video autoPlay muted loop preload='true'>
              <source src={bannerVideo2} />
              <source src={bannerVideo1} />
            </video>
          </div>
        </div>
      </section>

      <div className='content-container'>
        <section className='gallery'>
          {gallery.map((icon, index) => (
            <div key={`${icon.imgAlt}-${index}`}>
              <img src={icon.imgSrc} alt={icon.imgAlt} />
            </div>
          ))}
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
              <div className='right' onClick={handleClickToTop}>
                <div>Read All Reviews</div>
                <div>
                  <FontAwesomeIcon
                    icon={faCircleRight}
                    className='right-arrow-icon'
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='featured-course'>
          <div className='featured-course-img'>
            <img src={computer} alt='computer' />
          </div>
          <div className='featured-course-content'>
            <h6>
              <FontAwesomeIcon icon={faCircle} className='circle-icon' />
              FEATURED COURSE
            </h6>
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
          {courseCards.map((courseCard, index) => (
            <div className='card' key={`${courseCard.description}-${index}`}>
              <div className='card-img'>
                <img src={courseCard.imgSrc} alt={courseCard.imgAlt} />
              </div>
              <div className='card-content'>
                <h6>{courseCard.category}</h6>
                <h5>{courseCard.description}</h5>
                <div className='level-and-duration'>
                  <div className='level'>
                    <FontAwesomeIcon icon={faUser} className='user-icon' />
                    {courseCard.level}
                  </div>
                  <div className='duration'>
                    <FontAwesomeIcon
                      icon={faHourglassHalf}
                      className='hourglass-icon'
                    />
                    {courseCard.duration}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className='testimonial'>
          <div className='testimonial-head'>
            <div className='testimonial-head-left'>
              <h6>TESTIMONIALS</h6>
              <h2>Trusted by Thousand of Students and Tutors</h2>
            </div>
            <div className='testimonial-head-right'>
              <Button>Start Learning</Button>
            </div>
          </div>
          <Slider
            className='testimonial-carousel'
            dots
            infinite
            autoplay
            autoplaySpeed={5000}
            speed={500}
            slidesToScroll={1}
            slidesToShow={2}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: true,
                },
              },
            ]}
          >
            {userTestimonials.map((userTestimonial, index) => (
              <div
                className='testimonial-card'
                key={`${userTestimonial.username}-${index}`}
              >
                <div className='testimonial-card-img'>
                  <img
                    src={userTestimonial.imgSrc}
                    alt={userTestimonial.imgAlt}
                  />
                </div>
                <p>{userTestimonial.testimonial}</p>
                <div>{userTestimonial.username}</div>
              </div>
            ))}
          </Slider>
        </section>
      </div>

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

export default Home;
