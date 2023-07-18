import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from 'services/auth.service';
import logo from 'assets/images/logo.png';
import './header.scss';

const Header = (props) => {
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();
  const handleLogout = () => {
    AuthService.logout();
    window.alert('Logout successfully, now you are redirect to the homepage.');
    setCurrentUser(null); // 也可以寫setCurrentUser(AuthService.getCurrentUser());
    navigate('/'); // 重新導向至首頁
  };

  const handleGoToHome = () => {
    navigate('/');
  };

  const handleLoginModal = () => {
    //[TODO]: open login modal
  };

  return (
    <header>
      <div className='logo' onClick={handleGoToHome}>
        <img src={logo} alt='logo' />
      </div>
      <nav className='menu'>
        <ul>
          <li>
            <Link to='/all-courses'>All Courses</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link to='/contact'>Contact</Link>
          </li>
          {/* <li><Link to='/register'>Register</Link></li> */}
          <li onClick={handleLoginModal}>
            {/* <Link to='/login'>Login</Link> */}
            {currentUser ? 'User' : 'Login'}
          </li>
          {currentUser && (
            <>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <Link to='/my-courses'>Course</Link>
              </li>
              {currentUser.user.role === 'instructor' && (
                <li>
                  <Link to='/postCourse'>Post Course</Link>
                </li>
              )}
              {currentUser.user.role === 'student' && (
                <li>
                  <Link to='/enroll'>Enroll</Link>
                </li>
              )}
            </>
          )}
        </ul>
      </nav>
      {currentUser && <div className='user'></div>}
    </header>
  );
};

export default Header;
