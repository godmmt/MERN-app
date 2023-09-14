import React, { useEffect, useState } from 'react';
import CourseService from 'services/course.service';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import CourseCards from 'components/CourseCards';
import './allCourses.scss';

const AllCourses = ({ currentUser, setIsModalOpen }) => {
  // state 用來儲存從API當中所獲得的Course Data
  const [allCoursesData, setAllCoursesData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchCourseName, setSearchCourseName] = useState('');
  const [searchCourseData, setSearchCourseData] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [showNotFoundMsg, setShowNotFoundMsg] = useState(false);

  const handleChangeInput = (event) => {
    const value = event.target.value;
    setSearchInput(value);
    setSearchCourseName(value.trim());
  };

  const handleSearch = () => {
    setSearchCourseData([]); // 清空搜尋結果
    setShowMessage(false); // 清空提示
    setShowNotFoundMsg(false); // 清空查無資料提示
    if (searchCourseName) {
      CourseService.getCourseByName(searchCourseName)
        .then((response) => {
          console.log({ response });
          if (Array.isArray(response.data) && response.data.length !== 0) {
            setSearchCourseData(response.data); // 取得資料
          } else {
            setShowNotFoundMsg(true); // 打開查無資料提示
          }
        })
        .catch((err) => {
          console.log({ err });
        });
    } else {
      setShowMessage(true); // 打開提示
    }
    setSearchInput(''); // 清空搜尋欄位的值
  };

  // 網頁組件渲染完後就執行effect
  useEffect(() => {
    // console.log('Using effect!');
    CourseService.getAllCourses()
      .then((res) => {
        console.log({ res });
        setAllCoursesData(res.data); // Array
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <main className='all-courses'>
      <section className='main-content'>
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
          {searchCourseData && <CourseCards courses={searchCourseData} currentUser={currentUser} setIsModalOpen={setIsModalOpen}></CourseCards>}
        </div>
        {searchCourseData && searchCourseData.length > 0 && <div className='dividing-line'></div>}

        <CourseCards courses={allCoursesData} currentUser={currentUser} setIsModalOpen={setIsModalOpen}></CourseCards>
      </section>
    </main>
  );
};

export default AllCourses;
