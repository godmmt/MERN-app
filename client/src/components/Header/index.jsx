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
  return (
    <header>
      <div className='logo'>
        <img src={logo} alt='logo' />
      </div>
      <nav className='menu'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          {!currentUser && (
            <li>
              <Link to='/register'>Register</Link>
            </li>
          )}
          {!currentUser && (
            <li>
              <Link to='/login'>Login</Link>
            </li>
          )}
          {currentUser && (
            <li>
              <Link onClick={handleLogout} to='#'>
                Logout
              </Link>
            </li>
          )}
          {currentUser && (
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          )}
          {currentUser && (
            <li>
              <Link to='/course'>Course</Link>
            </li>
          )}
          {currentUser && currentUser.user.role === 'instructor' && (
            <li>
              <Link to='/postCourse'>Post Course</Link>
            </li>
          )}
          {currentUser && currentUser.user.role === 'student' && (
            <li>
              <Link to='/enroll'>Enroll</Link>
            </li>
          )}
        </ul>
      </nav>
      {currentUser && <div className='user'></div>}
    </header>
  );
};

export default Header;
