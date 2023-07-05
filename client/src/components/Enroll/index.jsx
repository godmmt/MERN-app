import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CourseService from '../../services/course.service';

const Enroll = (props) => {
  let { currentUser, setCurrentUser } = props;
  const history = useHistory();
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const handleTakeToLogin = () => {
    history.push('/login');
  };
  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = () => {
    CourseService.getCourseByName(searchInput)
      .then((data) => {
        console.log(data);
        if (Array.isArray(data.data)) {
          setSearchResult(data.data);
        } else {
          setSearchResult(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEnroll = (e) => {
    CourseService.enroll(e.target.id, currentUser.user._id)
      .then(() => {
        window.alert('Done Enrollment');
        history.push('/course');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (searchResult) {
      // 在這裡可以對 searchResult 進行其他操作或處理
      console.log('searchResult是: ', searchResult, typeof searchResult);
    }
  }, [searchResult]);

  return (
    <div style={{ padding: '3rem' }}>
      {!currentUser && (
        <div>
          <p>You must login first before searching for courses.</p>
          <button
            className='btn btn-primary btn-lg'
            onClick={handleTakeToLogin}
          >
            Take me to login page.
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role === 'instructor' && (
        <div>
          <h1>Only students can enroll in courses.</h1>
        </div>
      )}
      {currentUser && currentUser.user.role === 'student' && (
        <div className='search input-group mb-3'>
          <input
            onChange={handleChangeInput}
            type='text'
            className='form-control'
          />
          <button onClick={handleSearch} className='btn btn-primary'>
            Search
          </button>
        </div>
      )}
      {currentUser && searchResult && searchResult.length > 0 && (
        <div>
          <p>以下為查詢結果:</p>
          {searchResult.map((course) => {
            return (
              <div key={course._id} className='card' style={{ width: '18rem' }}>
                <div className='card-body'>
                  <h5 className='card-title'>{course.title}</h5>
                  <p className='card-text'>{course.description}</p>
                  <p>Price: {course.price}</p>
                  <p>Student: {course.students.length}</p>
                  <a
                    href='#'
                    onClick={handleEnroll}
                    className='card-text btn btn-primary'
                    id={course._id}
                  >
                    Enroll
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {currentUser && searchResult && searchResult.length === 0 && (
        <div>
          <h1>查無相關課程，請重新輸入欲查詢的課程名稱</h1>
        </div>
      )}
      {currentUser && !searchResult && (
        <div>
          <h1>請輸入欲查詢的課程名稱</h1>
        </div>
      )}
    </div>
  );
};

export default Enroll;
