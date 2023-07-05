import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CourseService from 'services/course.service';

const Course = (props) => {
  let { currentUser, setCurrentUser } = props;
  const history = useHistory();
  const handleTakeToLogin = () => {
    history.push('/login');
  };
  // state 用來儲存從API當中所獲得的Course Data
  let [courseData, setCourseData] = useState(null);

  // 一進入網頁就要根據身分得到所對應的課程
  useEffect(() => {
    console.log('Using effect');
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
    } else {
      _id = '';
    }
    if (currentUser.user.role === 'instructor') {
      // 身分是講師就得到講師創立的所有課程
      CourseService.get(_id)
        .then((data) => {
          console.log(data);
          setCourseData(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (currentUser.user.role === 'student') {
      // 身分是學生就得到學生註冊的所有課程
      CourseService.getEnrolledCourses(_id)
        .then((data) => {
          console.log(data);
          setCourseData(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <div style={{ padding: '3rem' }}>
      {!currentUser && (
        <div>
          <p>You must login before seeing your courses.</p>
          <button
            onClick={handleTakeToLogin}
            className='btn btn-primary btn-lg'
          >
            Take me to login page
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role === 'instructor' && (
        <div>
          <h1>Welcome to instructor's Course page.</h1>
        </div>
      )}
      {currentUser && currentUser.user.role === 'student' && (
        <div>
          <h1>Welcome to student's Course page.</h1>
        </div>
      )}
      {currentUser && courseData && courseData.length !== 0 && (
        <div>
          <p>Here's thd data we got back from server.</p>
          {courseData.map((course) => {
            return (
              <div className='card' style={{ width: '18rem' }}>
                <div className='card-body'>
                  <h5 className='card-title'>{course.title}</h5>
                  <p className='card-text'>{course.description}</p>
                  <p>Student Count: {course.students.length}</p>
                  <button className='btn btn-primary'>{course.price}</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Course;
