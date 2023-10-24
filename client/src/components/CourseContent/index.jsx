import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTER_PATH } from 'App';
import CourseService from '../../services/course.service';
import Button from 'components/Button';
import useModal from 'hooks/useModal';
import useCurrentUser from 'hooks/useCurrentUser';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import './courseContent.scss';

const CourseContent = () => {
  const { id, hasUser, isStudent } = useCurrentUser();
  const { openLoginModal } = useModal();
  const location = useLocation();
  const course = location.state;
  const navigate = useNavigate();

  const handleEnroll = async () => {
    try {
      if (!hasUser) {
        openLoginModal(true);
        return;
      }
      const res = await CourseService.enroll(course._id, id);
      window.alert(res.data.message);
      navigate(ROUTER_PATH.profile);
    } catch (err) {
      console.log(err);
    }
  };

  const handleStartLesson = () => {
    //TODO
    window.alert('This feature is coming soon.');
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

          {!hasUser && (
            <Button cx='submit-btn' onClick={handleEnroll}>
              Enroll
            </Button>
          )}

          {hasUser &&
            isStudent &&
            (course.students.some((item) => item === id) ? (
              <Button cx='submit-btn' onClick={handleStartLesson}>
                Start Lesson
              </Button>
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
