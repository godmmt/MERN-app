import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'components/Modal';
import Navbar from './Navbar';
import { ROUTER_PATH } from 'App';
import logo from 'assets/images/logo.png';
/* Font Awesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import './header.scss';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate(ROUTER_PATH.home);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

      <Modal />
    </header>
  );
};

export default Header;
