import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTER_PATH } from 'App';
import CourseService from 'services/course.service';
import CourseCards from 'components/CourseCards';
import useCurrentUser from 'hooks/useCurrentUser';
import './profile.scss';

const Profile = () => {
  const { currentUser } = useCurrentUser();
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
      <section className='main-content'>
        {currentUser && (
          <div className='card-layout'>
            <h1>Your Personal Information</h1>
            <div className='user-information'>
              <div className='column'>
                <p>Name :</p>
                <div>{currentUser.user.username}</div>
              </div>
              <div className='column'>
                <p>Email :</p>
                <div>{currentUser.user.email}</div>
              </div>
              <div className='column'>
                <p>Role :</p>
                <div>{currentUser.user.role}</div>
              </div>
              <div className='column'>
                <p>The date you registered on our website :</p>
                <div>{currentUser.user.date.substring(0, 10)}</div>
              </div>
            </div>
          </div>
        )}

        {currentUser && (
          <div className='card-layout'>
            {currentUser.user.role === 'instructor' && <h1>Courses You've Created</h1>}
            {currentUser.user.role === 'instructor' && courseData && courseData.length === 0 && (
              <div className='msg-for-no-course'>
                <p>
                  You haven't created any courses yet. Please go to <span>Post Course</span> to create a course.
                </p>
              </div>
            )}

            {currentUser.user.role === 'student' && <h1>Your Purchased Courses</h1>}
            {currentUser.user.role === 'student' && courseData && courseData.length === 0 && (
              <div className='msg-for-no-course'>
                <p>
                  You haven't purchased any courses yet. Go to <span onClick={handleTakeToAllCourses}>All Courses</span> to search for courses that
                  interest you.
                </p>
              </div>
            )}
            {courseData && courseData.length !== 0 && <CourseCards courses={courseData}></CourseCards>}
          </div>
        )}
      </section>
    </main>
  );
};

export default Profile;
