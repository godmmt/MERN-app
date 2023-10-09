import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import PostCourse from './pages/PostCourse';
import CourseContent from './components/CourseContent';
import AllCourses from 'pages/AllCourses';
import About from 'pages/About';
import Contact from 'pages/Contact';
import CommonLayout from 'layouts/CommonLayout';
import PrivateRoutes from 'utils/PrivateRoutes';
import UserProvider from 'providers/UserProvider';
import ModalProvider from 'providers/ModalProvider';
import UnsubscribeNewsletter from 'pages/UnsubscribeNewsletter';
import './styles/base.scss';

export const ROUTER_PATH = {
  home: '/',
  allCourses: '/all-courses',
  about: '/about',
  contact: '/contact',
  profile: '/profile',
  postCourse: '/post-course',
  courseContent: '/course-content',
  // 取消訂閱電子報的路徑
  unsubscribeNewsletter: '/unsubscribe-newsletter/:email',
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserProvider />}>
          <Route element={<ModalProvider />}>
            <Route element={<CommonLayout />}>
              <Route element={<Home />} path={ROUTER_PATH.home}></Route>
              <Route element={<AllCourses />} path={ROUTER_PATH.allCourses}></Route>
              <Route element={<About />} path={ROUTER_PATH.about}></Route>
              <Route element={<Contact />} path={ROUTER_PATH.contact}></Route>
              <Route element={<CourseContent />} path={ROUTER_PATH.courseContent}></Route>
              <Route element={<PrivateRoutes />}>
                <Route element={<Profile />} path={ROUTER_PATH.profile}></Route>
                <Route element={<PostCourse />} path={ROUTER_PATH.postCourse}></Route>
              </Route>
              <Route element={<UnsubscribeNewsletter />} path={ROUTER_PATH.unsubscribeNewsletter}></Route>
              {/* TODO: 錯誤處理的路由 */}
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
