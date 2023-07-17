import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Course from './components/Course';
import PostCourse from './components/PostCourse';
import Enroll from './components/Enroll';
import AuthService from './services/auth.service';
import Footer from 'components/Footer';
import './styles/base.scss';

function App() {
  // 用一個state來儲存目前網頁使用者是誰
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  return (
    <BrowserRouter>
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route element={<Home />} path='/'></Route>
        <Route element={<Register />} path='/register'></Route>
        <Route
          element={
            <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
          path='/login'
        ></Route>
        <Route
          element={
            <Profile
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
          path='/profile'
        ></Route>
        <Route
          element={
            <Course currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
          path='/course'
        ></Route>
        <Route
          element={
            <PostCourse
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
          path='/postCourse'
        ></Route>
        <Route
          element={
            <Enroll currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
          path='/enroll'
        ></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
