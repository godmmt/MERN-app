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
  const [searchCourseData, setSearchCourseData] = useState([]);
  const [showNotFoundMsg, setShowNotFoundMsg] = useState(false);

  const handleChangeInput = (event) => {
    const value = event.target.value;
    setSearchInput(value);
    setShowNotFoundMsg(false); // 清空查無資料提示
  };

  const handleSearch = () => {
    const courseName = searchInput.trim();
    CourseService.getCourseByName(courseName)
      .then((response) => {
        setSearchCourseData(response.data); // 取得資料
        setShowNotFoundMsg(!response.data.length); // 打開查無資料提示
      })
      .catch((err) => {
        console.log({ err });
        setSearchCourseData([]); // 清空搜尋結果
        setShowNotFoundMsg(false); // 清空查無資料提示
      });
    setSearchInput(''); // 清空搜尋欄位的值
  };

  // 網頁組件渲染完後就執行effect
  useEffect(() => {
    CourseService.getAllCourses()
      .then((res) => {
        setAllCoursesData(res.data); // Array
      })
      .catch((error) => {
        console.log({ error });
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
          {searchCourseData.length > 0 && (
            <>
              <CourseCards courses={searchCourseData} currentUser={currentUser} setIsModalOpen={setIsModalOpen}></CourseCards>
              <div className='dividing-line'></div>
            </>
          )}
        </div>

        <CourseCards courses={allCoursesData} currentUser={currentUser} setIsModalOpen={setIsModalOpen}></CourseCards>
      </section>
    </main>
  );
};

export default AllCourses;
