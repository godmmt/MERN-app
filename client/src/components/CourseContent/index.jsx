import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CourseService from '../../services/course.service';
import Button from 'components/Button';
import { ROUTER_PATH } from 'App';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// solid-svg-icons
import { faUserTie, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { useCurrentUser, useModal } from 'hooks';
import './courseContent.scss';

const CourseContent = () => {
  const { currentUser } = useCurrentUser();
  const { setIsModalOpen } = useModal();
  const location = useLocation();
  const course = location.state;
  const navigate = useNavigate();

  const handleEnroll = async () => {
    try {
      const res = await CourseService.enroll(course._id, currentUser.user._id);
      window.alert(res.data);
      console.log({ res });
      navigate(ROUTER_PATH.profile);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = () => {
    setIsModalOpen(true);
  };

  return (
    <main className='course-content'>
      {course && (
        <section className='main-content'>
          <div className='course-img'>
            <img src={course.img} alt='course-img' />
          </div>
          <div className='course-intro'>
            <h1>{course.title}</h1>
            <h5>{course.subtitle}</h5>
            <div className='price-and-instructor'>
              <div className='instructor'>
                <FontAwesomeIcon icon={faUserTie} fixedWidth />
                <h6>{course.instructor.username}</h6>
              </div>
              <div className='price'>
                <FontAwesomeIcon icon={faDollarSign} fixedWidth />
                <h6>{course.price}</h6>
              </div>
            </div>
            <p className='description'>{course.description}</p>
          </div>

          {!currentUser && (
            <Button cx='submit-btn' onClick={handleLogin}>
              Enroll
            </Button>
          )}

          {currentUser?.user.role === 'student' &&
            (course.students.some((item) => item === currentUser.user._id) ? (
              <Button cx='submit-btn'>Start Lesson</Button>
            ) : (
              <Button cx='submit-btn' onClick={handleEnroll}>
                Enroll
              </Button>
            ))}
        </section>
      )}
    </main>
  );
};

export default CourseContent;
