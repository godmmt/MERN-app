import React, { useEffect, useState } from 'react';
import CourseService from 'services/course.service';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import Button from 'components/Button';
import './allCourses.scss';

const AllCourses = () => {
  // state 用來儲存從API當中所獲得的Course Data
  const [courseData, setCourseData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = () => {
    if (searchInput) {
      CourseService.getCourseByName(searchInput)
        .then((data) => {
          console.log({ data });
          if (data.data.length === 0) {
            setSearchResult(null);
          } else {
            setSearchResult(data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setSearchInput(null);
    }
  };

  // 網頁組件渲染完後就執行effect
  useEffect(() => {
    // console.log('Using effect!');
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
          <input type='text' placeholder='Search...' onChange={handleChangeInput} />
          <div>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='search-btn' fixedWidth onClick={handleSearch} />
          </div>
        </div>
        <div className='search-result'>
          {!searchResult && (
            <div className='search-msg'>
              No matching courses found!
              <br />
              Please enter the course name you want to search again.
            </div>
          )}
          {searchInput === null && (
            <div>
              <h1>請輸入欲查詢的課程名稱</h1>
            </div>
          )}
          {searchResult &&
            searchResult.map((course) => {
              return (
                <div className='course' key={course._id}>
                  <div className='intro'>
                    <h2>{course.title}</h2>
                    <p>{course.description}</p>
                  </div>
                  <div className='instructor'>{course.instructor.username}</div>
                  <div className='course-price'>
                    <span>$ </span>
                    <span>{course.price}</span>
                  </div>
                  <Button cx='see-more-btn'>See More...</Button>
                </div>
              );
            })}
        </div>
        {searchResult && searchResult.length > 0 && <div className='dividing-line'></div>}

        <div className='all-courses'>
          {courseData.map((course) => {
            return (
              <div className='course' key={course._id}>
                <div className='intro'>
                  <h2>{course.title}</h2>
                  <p>{course.description}</p>
                </div>
                <div className='instructor'>{course.instructor.username}</div>
                <div className='course-price'>
                  <span>$ </span>
                  <span>{course.price}</span>
                </div>
                <Button cx='see-more-btn'>See More...</Button>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default AllCourses;
