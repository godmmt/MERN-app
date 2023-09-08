import React from 'react';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTER_PATH } from 'App';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// solid-svg-icons
import { faUserTie, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import './courseCards.scss';

const CourseCards = ({ courses }) => {
  const navigate = useNavigate();
  const goToCourseContent = (course) => {
    navigate(ROUTER_PATH.courseContent, {
      state: course,
    });
  };

  return (
    <div className='course-cards'>
      {courses.map((course) => {
        return (
          <div key={course._id} className='course-card'>
            <div className='course-img'>
              <img src={course.img.replace('.png', 'l.png')} alt={`${course.title}-img`} />
            </div>
            <div className='course-intro'>
              <h2>{course.title}</h2>
              <p>{course.subtitle}</p>
            </div>
            <div className='price-and-instructor'>
              <div className='instructor'>
                <FontAwesomeIcon icon={faUserTie} fixedWidth />
                <p>{course.instructor.username}</p>
              </div>
              <div className='price'>
                <FontAwesomeIcon icon={faDollarSign} fixedWidth />
                <h6>{course.price}</h6>
              </div>
            </div>
            <Button
              cx='see-more-btn'
              onClick={() => {
                goToCourseContent(course);
              }}
            >
              See More...
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default CourseCards;
