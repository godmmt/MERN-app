import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseService from 'services/course.service';
import { ROUTER_PATH } from 'App';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import Button from 'components/Button';
import './allCourses.scss';

const AllCourses = () => {
  const navigate = useNavigate();

  // state 用來儲存從API當中所獲得的Course Data
  const [courseData, setCourseData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [showNotFoundMsg, setShowNotFoundMsg] = useState(false);

  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = () => {
    setSearchResult([]); // 清空搜尋結果
    setShowMessage(false); // 清空提示
    setShowNotFoundMsg(false); // 清空查無資料提示

    if (searchInput.trim() !== '') {
      CourseService.getCourseByName(searchInput.trim())
        .then((data) => {
          console.log({ data });
          if (data.data.length !== 0) {
            setSearchResult(data.data); // 取得資料
          } else {
            setShowNotFoundMsg(true); // 打開查無資料提示
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setShowMessage(true); // 打開提示
    }

    setSearchInput(''); // 清空搜尋欄位的值
  };

  const handleTakeToEnroll = (course) => {
    navigate(ROUTER_PATH.enroll, {
      state: course,
    });
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
          <input type='text' value={searchInput} placeholder='Search...' onChange={handleChangeInput} />
          <div>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='search-btn' fixedWidth onClick={handleSearch} />
          </div>
        </div>
        <div className='search-result'>
          {showNotFoundMsg && (
            <div className='message'>
              No matching courses found!
              <br />
              Please enter the course name you want to search again.
            </div>
          )}
          {showMessage && <div className='message'>Please enter the course name you want to search.</div>}
          {searchResult &&
            searchResult.map((course) => {
              return (
                <div className='course' key={course._id}>
                  <div className='intro'>
                    <h2>{course.title}</h2>
                    <p>{course.subtitle}</p>
                  </div>
                  <div className='instructor'>{course.instructor.username}</div>
                  <div className='course-price'>
                    <span>$ </span>
                    <span>{course.price}</span>
                  </div>
                  <Button
                    cx='see-more-btn'
                    onClick={() => {
                      handleTakeToEnroll(course);
                    }}
                  >
                    See More...
                  </Button>
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
                  <p>{course.subtitle}</p>
                </div>
                <div className='instructor'>{course.instructor.username}</div>
                <div className='course-price'>
                  <span>$ </span>
                  <span>{course.price}</span>
                </div>
                <Button
                  cx='see-more-btn'
                  onClick={() => {
                    handleTakeToEnroll(course);
                  }}
                >
                  See More...
                </Button>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default AllCourses;
