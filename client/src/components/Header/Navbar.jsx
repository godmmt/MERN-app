import { ROUTER_PATH } from 'App';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from 'services/auth.service';

const Navbar = ({
  type,
  currentUser,
  setCurrentUser,
  setIsModalOpen,
  setIsOpenMenu,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    window.alert('Logout successfully, now you are redirect to the homepage.');
    setCurrentUser(null); // 也可以寫setCurrentUser(AuthService.getCurrentUser());
    navigate('/');
  };

  const handleOpenLoginModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseMenu = () => {
    setIsOpenMenu(false);
  };

  return (
    <nav className={type}>
      <ul onClick={handleCloseMenu}>
        <li>
          <Link to={ROUTER_PATH.allCourses}>All Courses</Link>
        </li>
        <li>
          <Link to={ROUTER_PATH.about}>About</Link>
        </li>
        <li>
          <Link to={ROUTER_PATH.contact}>Contact</Link>
        </li>

        {currentUser && (
          <>
            <li>
              <Link to={ROUTER_PATH.profile}>Profile</Link>
            </li>
            <li>
              <Link to={ROUTER_PATH.myCourses}>Course</Link>
            </li>
            {currentUser.user.role === 'instructor' && (
              <li>
                <Link to={ROUTER_PATH.postCourse}>Post Course</Link>
              </li>
            )}
            {currentUser.user.role === 'student' && (
              <li>
                <Link to={ROUTER_PATH.enroll}>Enroll</Link>
              </li>
            )}
          </>
        )}

        {currentUser ? (
          <li onClick={handleLogout}>Logout</li>
        ) : (
          <li onClick={handleOpenLoginModal}>Login</li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
