import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeComponent from './components/Home';
import NavComponent from './components/Nav';
import RegisterComponent from './components/Register';
import LoginComponent from './components/Login';
import ProfileComponent from './components/Profile';
import CourseComponent from './components/Course';
import PostCourseComponent from './components/PostCourse';
import EnrollComponent from './components/Enroll';
import AuthService from './services/auth.service';

function App() {
  // 用一個state來儲存目前網頁使用者是誰
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  return (
    <div>
      <NavComponent currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Switch>
        <Route path='/' exact>
          <HomeComponent />
        </Route>
        <Route path='/register' exact>
          <RegisterComponent />
        </Route>
        <Route path='/login' exact>
          <LoginComponent
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route path='/profile' exact>
          <ProfileComponent
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route path='/course' exact>
          <CourseComponent
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route path='/postCourse' exact>
          <PostCourseComponent
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route path='/enroll' exact>
          <EnrollComponent
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
