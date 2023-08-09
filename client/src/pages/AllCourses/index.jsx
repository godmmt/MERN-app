import React, { useEffect, useState } from 'react';
import CourseService from 'services/course.service';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import Button from 'components/Button';
import './allCourses.scss';

const AllCourses = () => {
  // state 用來儲存從API當中所獲得的Course Data
  const [courseData, setCourseData] = useState(null);

  // 網頁組件渲染完後就執行effect
  useEffect(() => {
    console.log('Using effect!');
    CourseService.getAllCourses()
      .then((data) => {
        console.log({ data });
        setCourseData(data.data); // Array
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <main className='all-courses'>
      <section className='banner'>
        <div className='search-bar'>
          <input type='text' placeholder='Search...' />
          <div>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='search-btn' fixedWidth />
          </div>
        </div>
      </section>
      <section className='all-courses'>
        {courseData &&
          courseData.length !== 0 &&
          courseData.map((course) => {
            return (
              <div className='course'>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className='instructor'>
                  <h6>Instructor: {course.instructor.username}</h6>
                </div>
                <div className='course-price'>Price: {course.price}</div>
                <Button>See More...</Button>
              </div>
            );
          })}
      </section>
    </main>
  );
};

export default AllCourses;
