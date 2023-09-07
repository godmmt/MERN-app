import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTER_PATH } from 'App';
import CourseService from 'services/course.service';
import CourseCards from 'components/CourseCards';
import Button from 'components/Button';
import './profile.scss';

const Profile = ({ currentUser, setIsModalOpen }) => {
  const handleTakeToLogin = () => {
    setIsModalOpen(true);
  };
  const navigate = useNavigate();
  const handleTakeToAllCourses = () => {
    navigate(ROUTER_PATH.allCourses);
  };
  // state 用來儲存從API當中所獲得的Course Data
  const [courseData, setCourseData] = useState([]);

  // 一進入網頁就要根據身分得到所對應的課程
  useEffect(() => {
    console.log('Using effect');
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
    } else {
      _id = '';
    }
    if (currentUser?.user.role === 'instructor') {
      // 身分是講師就得到講師創立的所有課程
      CourseService.getCoursesByInstructorID(_id)
        .then((res) => {
          console.log({ res });
          setCourseData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (currentUser?.user.role === 'student') {
      // 身分是學生就得到學生註冊的所有課程
      CourseService.getCoursesByStudentID(_id)
        .then((res) => {
          console.log({ res });
          setCourseData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentUser]);

  return (
    <main className='profile'>
      {currentUser && (
        <section>
          <p>{currentUser.user.username}</p>
          <p>ID: {currentUser.user._id}</p>
          <p>email: {currentUser.user.email}</p>
        </section>
      )}
      {!currentUser && (
        <section className='alert-msg'>
          <p>You must login before seeing your Profile.</p>
          <Button cx='login-btn' onClick={handleTakeToLogin}>
            Take me to login page
          </Button>
        </section>
      )}

      {currentUser?.user.role === 'instructor' && <section className='my-courses-header'>Courses You've Created :</section>}
      {currentUser?.user.role === 'instructor' && courseData && courseData.length === 0 && (
        <section className='msg-for-no-course'>
          <p>
            You haven't created any courses yet. Please go to <span>Post Course</span> to create a course.
          </p>
        </section>
      )}
      {currentUser?.user.role === 'student' && <section className='my-courses-header'>Your Purchased Courses :</section>}
      {currentUser?.user.role === 'student' && courseData && courseData.length === 0 && (
        <section className='msg-for-no-course'>
          <p>
            You haven't purchased any courses yet. Go to <span onClick={handleTakeToAllCourses}>All Courses</span> to search for courses that interest
            you.
          </p>
        </section>
      )}
      {currentUser && courseData && courseData.length !== 0 && <CourseCards courses={courseData} currentUser={currentUser}></CourseCards>}
    </main>
  );
};

export default Profile;
