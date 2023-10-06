import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import Modal from 'components/Modal';
import Login from 'components/Login';
import Register from 'components/Register';
import ResetPassword from 'components/ResetPassword';
import Navbar from './Navbar';
import { ROUTER_PATH } from 'App';
import logo from 'assets/images/logo.png';
import { useModal } from 'hooks';
/* Font Awesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import './header.scss';

const Header = () => {
  const { modalType, isLogin, isRegister, isResetPassword } = useModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate(ROUTER_PATH.home);
  };

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header onClick={(event) => event.stopPropagation()}>
      <div className='logo' onClick={handleGoToHome}>
        <img src={logo} alt='logo' />
      </div>
      <Navbar type='web' setIsMenuOpen={setIsMenuOpen} />
      <div className='hamburger-menu' onClick={handleToggleMenu}>
        <FontAwesomeIcon icon={isMenuOpen ? faSquareXmark : faBars} fixedWidth className='icon' />
      </div>
      {isMenuOpen && <Navbar type='mobile' setIsMenuOpen={setIsMenuOpen} />}

      {modalType &&
        createPortal(
          <Modal>
            {isLogin && <Login />}
            {isRegister && <Register />}
            {isResetPassword && <ResetPassword />}
          </Modal>,
          document.body
        )}
    </header>
  );
};

export default Header;
