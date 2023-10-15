import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTER_PATH } from 'App';
import CourseService from 'services/course.service';
import CourseCards from 'components/CourseCards';
import useCurrentUser from 'hooks/useCurrentUser';
import './profile.scss';
import AuthService from 'services/auth.service';

const Profile = () => {
  const { id, role, isInstructor, isStudent } = useCurrentUser();

  const [userInfo, setUserInfo] = useState(null);

  // 跳轉routes
  const navigate = useNavigate();
  const handleTakeToAllCourses = () => {
    navigate(ROUTER_PATH.allCourses);
  };
  const handleTakeToPostCourse = () => {
    navigate(ROUTER_PATH.postCourse);
  };

  // state 用來儲存從API當中所獲得的Course Data
  const [courseData, setCourseData] = useState([]);
  // state 用來控制msg是否開啟
  const [isMsgOpen, setIsMsgOpen] = useState(false);

  useEffect(() => {
    AuthService.getUserInfo()
      .then((res) => {
        const userInfo = res.data?.value ?? null;
        setUserInfo(userInfo);
      })
      .catch((err) => {
        setUserInfo(null);
        console.log({ err });
      });
  }, []);

  // 一進入網頁就要根據身分得到所對應的課程
  useEffect(() => {
    // 講師
    if (isInstructor && id) {
      CourseService.getCoursesByInstructorID(id)
        .then((res) => {
          const courses = res.data?.value ?? [];
          setCourseData(courses);
          setIsMsgOpen(!courses.length);
        })
        .catch((err) => {
          console.log({ err });
        });
    }

    // 學生
    if (isStudent && id) {
      CourseService.getCoursesByStudentID(id)
        .then((res) => {
          const courses = res.data?.value ?? [];
          setCourseData(courses);
          setIsMsgOpen(!courses.length);
        })
        .catch((err) => {
          console.log({ err });
        });
    }
  }, [id, isInstructor, isStudent]);

  return (
    <main className='profile'>
      <section className='main-content'>
        <div className='card-layout'>
          <h1>Your Personal Information</h1>
          <div className='user-information'>
            <div className='column'>
              <p>Name :</p>
              <div>{userInfo?.username}</div>
            </div>
            <div className='column'>
              <p>Email :</p>
              <div>{userInfo?.email}</div>
            </div>
            <div className='column'>
              <p>Role :</p>
              <div>{role}</div>
            </div>
            <div className='column'>
              <p>The date you registered on our website :</p>
              <div>{userInfo?.date?.substring(0, 10)}</div>
            </div>
          </div>
        </div>

        <div className='card-layout'>
          {isInstructor && (
            <>
              <h1>Courses You've Created</h1>
              <div className={isMsgOpen ? 'msg-for-no-course' : 'close-msg'}>
                <p>
                  You haven't created any courses yet. Please go to <span onClick={handleTakeToPostCourse}>Post Course</span> to create a course.
                </p>
              </div>
            </>
          )}

          {isStudent && (
            <>
              <h1>Your Purchased Courses</h1>
              <div className={isMsgOpen ? 'msg-for-no-course' : 'close-msg'}>
                <p>
                  You haven't purchased any courses yet. Go to <span onClick={handleTakeToAllCourses}>All Courses</span> to search for courses that
                  interest you.
                </p>
              </div>
            </>
          )}

          {courseData && courseData.length !== 0 && <CourseCards courses={courseData}></CourseCards>}
        </div>
      </section>
    </main>
  );
};

export default Profile;
