import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTER_PATH } from 'App';
import useCurrentUser from 'hooks/useCurrentUser';
import useModal from 'hooks/useModal';

const Navbar = ({ type, setIsMenuOpen }) => {
  const navigate = useNavigate();
  const { hasUser, isInstructor, logout } = useCurrentUser();
  const { openLoginModal } = useModal();

  const handleLogout = () => {
    logout();
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

        {hasUser && (
          <>
            <li>
              <Link to={ROUTER_PATH.profile}>Profile</Link>
            </li>
            {isInstructor && (
              <li>
                <Link to={ROUTER_PATH.postCourse}>Post Course</Link>
              </li>
            )}
          </>
        )}

        {hasUser ? <li onClick={handleLogout}>Logout</li> : <li onClick={openLoginModal}>Login</li>}
      </ul>
    </nav>
  );
};

export default Navbar;
