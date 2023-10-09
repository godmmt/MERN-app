import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTER_PATH } from 'App';
import useCurrentUser from 'hooks/useCurrentUser';
import useModal from 'hooks/useModal';
import AuthService from 'services/auth.service';

const Navbar = ({ type, setIsMenuOpen }) => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useCurrentUser();
  const { openLoginModal } = useModal();

  const handleLogout = () => {
    AuthService.logout();
    window.alert('Logout successfully, now you are redirect to the homepage.');
    setCurrentUser(AuthService.getCurrentUser()); // 也可以寫null
    navigate(ROUTER_PATH.home);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
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
            {currentUser.user.role === 'instructor' && (
              <li>
                <Link to={ROUTER_PATH.postCourse}>Post Course</Link>
              </li>
            )}
          </>
        )}

        {currentUser ? <li onClick={handleLogout}>Logout</li> : <li onClick={openLoginModal}>Login</li>}
      </ul>
    </nav>
  );
};

export default Navbar;
