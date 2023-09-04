import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import Modal from 'components/Modal';
import Login from 'components/Login';
import Register from 'components/Register';
import Navbar from './Navbar';
import { ROUTER_PATH } from 'App';
import logo from 'assets/images/logo.png';
import burgerMenu from 'assets/images/burger-menu.svg';
import close from 'assets/images/close.svg';
import './header.scss';

const Header = ({ currentUser, setCurrentUser, isModalOpen, setIsModalOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasAccount, setHasAccount] = useState(true);

  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate(ROUTER_PATH.home);
  };

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCloseLoginModal = () => {
    setIsModalOpen(false);
    setHasAccount(true);
  };

  return (
    <header onClick={(event) => event.stopPropagation()}>
      <div className='logo' onClick={handleGoToHome}>
        <img src={logo} alt='logo' />
      </div>

      <Navbar type='web' currentUser={currentUser} setCurrentUser={setCurrentUser} setIsModalOpen={setIsModalOpen} setIsMenuOpen={setIsMenuOpen} />

      <div className='hamburger-menu' onClick={handleToggleMenu}>
        <img src={isMenuOpen ? close : burgerMenu} alt='hamburger-menu' />
      </div>

      {isMenuOpen && (
        <Navbar
          type='mobile'
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setIsModalOpen={setIsModalOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      )}

      {isModalOpen &&
        createPortal(
          <Modal onClose={handleCloseLoginModal}>
            {hasAccount ? (
              <Login setCurrentUser={setCurrentUser} handleCloseLoginModal={handleCloseLoginModal} setHasAccount={setHasAccount} />
            ) : (
              <Register setHasAccount={setHasAccount} handleCloseLoginModal={handleCloseLoginModal} />
            )}
          </Modal>,
          document.body
        )}
    </header>
  );
};

export default Header;
