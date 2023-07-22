import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import Modal from 'components/Modal';
import Login from 'components/Login';
import Navbar from './Navbar';
import logo from 'assets/images/logo.png';
import burgerMenu from 'assets/images/burger-menu.svg';
import close from 'assets/images/close.svg';
import './header.scss';

const Header = (props) => {
  let { currentUser, setCurrentUser } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate('/');
  };

  const handleToggleMenu = () => {
    setIsOpenMenu((prev) => !prev);
  };

  const handleCloseLoginModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header onClick={(event) => event.stopPropagation()}>
      <div className='logo' onClick={handleGoToHome}>
        <img src={logo} alt='logo' />
      </div>

      <Navbar
        type='web'
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setIsModalOpen={setIsModalOpen}
        setIsOpenMenu={setIsOpenMenu}
      />

      <div className='hamburger-menu' onClick={handleToggleMenu}>
        <img src={isOpenMenu ? close : burgerMenu} alt='hamburger-menu' />
      </div>

      {isOpenMenu && (
        <Navbar
          type='mobile'
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setIsModalOpen={setIsModalOpen}
          setIsOpenMenu={setIsOpenMenu}
        />
      )}

      {isModalOpen &&
        createPortal(
          <Modal onClose={handleCloseLoginModal}>
            <Login
              setCurrentUser={setCurrentUser}
              handleCloseLoginModal={handleCloseLoginModal}
            />
          </Modal>,
          document.body
        )}
    </header>
  );
};

export default Header;
