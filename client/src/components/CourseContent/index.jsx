import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CourseService from '../../services/course.service';
import Button from 'components/Button';
import useModal from 'hooks/useModal';
import useCurrentUser from 'hooks/useCurrentUser';
import { toast } from 'react-toastify';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import './courseContent.scss';

const CourseContent = () => {
  const { id, hasUser, isStudent } = useCurrentUser();
  const { openLoginModal } = useModal();
  const location = useLocation();
  const course = location.state;
  const [hasEnrolled, setHasEnrolled] = useState(course.students.includes(id));

  const handleEnroll = () => {
    if (!hasUser) {
      openLoginModal(true);
      return;
    }
    toast.dismiss();
    toast.promise(CourseService.enroll(course._id, id), {
      pending: 'Wait a moment . . .',
      success: {
        render({ data }) {
          setHasEnrolled(true);
          return data.data.message;
        },
      },
      error: {
        render({ data }) {
          return data.data.message ?? 'System error, please wait.';
        },
      },
    });
  };

  const handleStartLesson = () => {
    // TODO
    toast.dismiss();
    toast.info('This feature is coming soon !', { icon: '🚀' });
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
            (hasEnrolled ? (
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
