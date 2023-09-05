import React from 'react';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTER_PATH } from 'App';
import './courseCard.scss';

const CourseCard = (props) => {
  const { course, currentUser, setIsModalOpen, ...rest } = props;
  const navigate = useNavigate();
  const handleTakeToEnroll = (course) => {
    if (currentUser?.user.role === 'student') {
      navigate(ROUTER_PATH.courseContent, {
        state: course,
      });
    } else if (currentUser?.user.role === 'instructor') {
      window.alert('Only students can enroll in courses. Please use student account to login.');
    } else {
      handleTakeToLogin();
    }
  };

  const handleTakeToLogin = () => {
    setIsModalOpen(true);
  };

  return (
    <div className='course-card' {...rest}>
      <div className='intro'>
        <img src={course.img.replace('.png', 'l.png')} alt={`${course.title}-img`} />
        <h2>{course.title}</h2>
        <p>{course.subtitle}</p>
      </div>
      <div className='instructor'>{course.instructor.username}</div>
      <div className='course-price'>
        <span>$ </span>
        <span>{course.price}</span>
      </div>
      <Button
        cx='see-more-btn'
        onClick={() => {
          handleTakeToEnroll(course);
        }}
      >
        See More...
      </Button>
    </div>
  );
};

export default CourseCard;
