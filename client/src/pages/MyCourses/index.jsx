import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseService from 'services/course.service';
import { ROUTER_PATH } from 'App';
import './myCourse.scss';

const MyCourses = ({ currentUser }) => {
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate(ROUTER_PATH);
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
        .then((data) => {
          // console.log({ data });
          // console.log({ currentUser });
          setCourseData(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (currentUser?.user.role === 'student') {
      // 身分是學生就得到學生註冊的所有課程
      CourseService.getCoursesByStudentID(_id)
        .then((data) => {
          console.log(data);
          setCourseData(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentUser]);

  return (
    <main className='my-courses'>
      {!currentUser && (
        <div>
          <p>You must login before seeing your courses.</p>
          <button onClick={handleTakeToLogin}>Take me to login page</button>
        </div>
      )}
      {currentUser?.user.role === 'instructor' && <div className='message-instructor'>Below are the courses you have created.</div>}
      {currentUser?.user.role === 'student' && <div className='message-student'>Come learn together! Progress a little every day!</div>}
      {currentUser && courseData && courseData.length !== 0 && (
        <div>
          {courseData.map((course) => {
            return (
              <div key={course._id}>
                <h3>{course.title}</h3>
                <h5>{course.subtitle}</h5>
                <p>{course.description}</p>
                <p>Student Count: {course.students.length}</p>
                <div>Price: {course.price}</div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default MyCourses;
