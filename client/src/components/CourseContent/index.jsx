import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CourseService from '../../services/course.service';
import Button from 'components/Button';
import { ROUTER_PATH } from 'App';
import './courseContent.scss';

const CourseContent = ({ currentUser, setIsModalOpen }) => {
  const location = useLocation();
  const course = location.state;
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    setIsModalOpen(true);
  };
  const handleEnroll = async () => {
    try {
      const res = await CourseService.enroll(course._id, currentUser.user._id);
      window.alert(res.data);
      console.log({ res });
      navigate(ROUTER_PATH.myCourses);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className='course-content'>
      {!currentUser && (
        <div>
          <h1>You must login first before searching for courses.</h1>
          <Button onClick={handleTakeToLogin}>Login</Button>
        </div>
      )}
      {currentUser && currentUser.user.role === 'instructor' && (
        <div>
          <h1>Only students can enroll in courses.</h1>
        </div>
      )}
      {currentUser && currentUser.user.role === 'student' && course && (
        <div className='course' key={course._id}>
          <div>
            <img src={course.img} alt='course-img' />
          </div>
          <div className='intro'>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p>{course.students}</p>
          </div>
          <div className='instructor'>{course.instructor.username}</div>
          <div className='course-price'>
            <span>$ </span>
            <span>{course.price}</span>
          </div>

          {course.students.some((item) => item === currentUser.user._id) ? (
            <div>
              <h6>You already own this course. Click the button to start it.</h6>
              <Button>Start Lesson</Button>
            </div>
          ) : (
            <Button cx='enroll-btn' onClick={handleEnroll}>
              Enroll
            </Button>
          )}
        </div>
      )}
    </main>
  );
};

export default CourseContent;
