import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Profile from './components/Profile';
import MyCourses from './pages/MyCourses';
import PostCourse from './components/PostCourse';
import Enroll from './components/Enroll';
import AuthService from './services/auth.service';
import Footer from 'components/Footer';
import './styles/base.scss';
import AllCourses from 'pages/AllCourses';
import About from 'pages/About';
import Contact from 'pages/Contact';

export const ROUTER_PATH = {
  home: '/',
  allCourses: '/all-courses',
  about: '/about',
  contact: '/contact',
  myCourses: '/my-courses',
  profile: '/profile',
  postCourse: '/postCourse',
  enroll: '/enroll',
};

function App() {
  // 用一個state來儲存目前網頁使用者是誰
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  // 控制Login Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Routes>
        <Route element={<Home />} path={ROUTER_PATH.home}></Route>
        <Route element={<AllCourses currentUser={currentUser} setIsModalOpen={setIsModalOpen} />} path={ROUTER_PATH.allCourses}></Route>
        <Route element={<About />} path={ROUTER_PATH.about}></Route>
        <Route element={<Contact />} path={ROUTER_PATH.contact}></Route>
        <Route element={<Profile currentUser={currentUser} />} path={ROUTER_PATH.profile}></Route>
        <Route element={<MyCourses currentUser={currentUser} setIsModalOpen={setIsModalOpen} />} path={ROUTER_PATH.myCourses}></Route>
        <Route element={<PostCourse currentUser={currentUser} />} path={ROUTER_PATH.postCourse}></Route>
        <Route element={<Enroll currentUser={currentUser} setIsModalOpen={setIsModalOpen} />} path={ROUTER_PATH.enroll}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
