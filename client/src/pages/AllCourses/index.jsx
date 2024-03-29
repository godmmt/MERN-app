import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CourseService from 'services/course.service';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import CourseCards from 'components/CourseCards';
import './allCourses.scss';

const AllCourses = () => {
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
      .then((res) => {
        const courses = res.data?.value ?? [];
        setSearchCourseData(courses); // 取得資料
        setShowNotFoundMsg(!courses.length); // 打開查無資料提示
      })
      .catch((err) => {
        setSearchCourseData([]); // 清空搜尋結果
        setShowNotFoundMsg(false); // 清空查無資料提示
        console.log(err);
      });
    setSearchInput(''); // 清空搜尋欄位的值
  };

  // 網頁組件渲染完後就執行effect
  useEffect(() => {
    const pendingToastId = toast.loading('Loading ...');
    CourseService.getAllCourses()
      .then((res) => {
        toast.dismiss(pendingToastId);
        const courses = res.data?.value ?? [];
        setAllCoursesData(courses); // Array
      })
      .catch((err) => {
        toast.update(pendingToastId, { render: err.data?.message || 'System Error', type: 'error', isLoading: false, closeOnClick: true });
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
              <CourseCards courses={searchCourseData}></CourseCards>
              <div className='dividing-line'></div>
            </>
          )}
        </div>

        <CourseCards courses={allCoursesData}></CourseCards>
      </section>
    </main>
  );
};

export default AllCourses;
