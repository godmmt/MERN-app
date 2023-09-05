import React, { useEffect, useState } from 'react';
import CourseService from 'services/course.service';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Card from 'components/Card';
import './allCourses.scss';

const AllCourses = ({ currentUser, setIsModalOpen }) => {
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
        .then((res) => {
          console.log({ res });
          if (res.data.length !== 0) {
            setSearchResult(res.data); // 取得資料
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
          {searchResult && searchResult.map((course) => <Card course={course} currentUser={currentUser} setIsModalOpen={setIsModalOpen}></Card>)}
        </div>
        {searchResult && searchResult.length > 0 && <div className='dividing-line'></div>}

        <div className='all-courses'>
          {courseData.map((course) => {
            return <Card course={course} currentUser={currentUser} setIsModalOpen={setIsModalOpen}></Card>;
          })}
        </div>
      </section>
    </main>
  );
};

export default AllCourses;
