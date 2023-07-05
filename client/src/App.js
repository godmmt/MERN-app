import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Nav from './components/Nav';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Course from './components/Course';
import PostCourse from './components/PostCourse';
import Enroll from './components/Enroll';
import AuthService from './services/auth.service';

function App() {
  // 用一個state來儲存目前網頁使用者是誰
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  return (
    <div>
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/register' exact>
          <Register />
        </Route>
        <Route path='/login' exact>
          <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </Route>
        <Route path='/profile' exact>
          <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </Route>
        <Route path='/course' exact>
          <Course currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </Route>
        <Route path='/postCourse' exact>
          <PostCourse
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route path='/enroll' exact>
          <Enroll currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
