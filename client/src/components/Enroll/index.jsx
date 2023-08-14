import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseService from '../../services/course.service';
import Button from 'components/Button';
import './enroll.scss';

const Enroll = ({ currentUser }) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const handleTakeToLogin = () => {
    navigate('/login');
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
        navigate('/my-courses');
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
    <main className='enroll'>
      {!currentUser && (
        <div>
          <p>You must login first before searching for courses.</p>
          <Button onClick={handleTakeToLogin}>Take me to login page.</Button>
        </div>
      )}
      {currentUser && currentUser.user.role === 'instructor' && (
        <div>
          <h1>Only students can enroll in courses.</h1>
        </div>
      )}
      {currentUser && currentUser.user.role === 'student' && (
        <div>
          <input onChange={handleChangeInput} type='text' />
          <Button onClick={handleSearch}>搜尋</Button>
        </div>
      )}
      {currentUser && searchResult && searchResult.length > 0 && (
        <div>
          <p>以下為查詢結果:</p>
          {searchResult.map((course) => {
            return (
              <div key={course._id} className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>{course.title}</h5>
                  <p className='card-text'>{course.description}</p>
                  <p>Price: {course.price}</p>
                  <p>Student: {course.students.length}</p>
                  <Button onClick={handleEnroll} id={course._id}>
                    Enroll
                  </Button>
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
    </main>
  );
};

export default Enroll;
