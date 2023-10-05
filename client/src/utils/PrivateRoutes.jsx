import React from 'react';
import { Outlet } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import Modal from 'components/Modal';
import Login from 'components/Login';
import RecoverPassword from 'components/RecoverPassword';
import { useCurrentUser, useModal } from 'hooks';
import Register from 'components/Register';

const PrivateRoutes = () => {
  const { currentUser } = useCurrentUser();
  const { setIsModalOpen } = useModal();
  const [currentModal, setCurrentModal] = useState('login');

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentModal('login');
  };

  const openLoginModal = () => {
    setCurrentModal('login');
  };
  const openRegisterModal = () => {
    setCurrentModal('register');
  };
  const openForgetPasswordModal = () => {
    setCurrentModal('recoverPassword');
  };

  return currentUser ? (
    <Outlet />
  ) : (
    createPortal(
      <Modal onClose={closeModal} isCovered>
        {currentModal === 'login' && (
          <Login closeModal={closeModal} openRegisterModal={openRegisterModal} openForgetPasswordModal={openForgetPasswordModal} hideCloseIcon />
        )}

        {currentModal === 'register' && <Register closeModal={closeModal} openLoginModal={openLoginModal} hideCloseIcon />}

        {currentModal === 'recoverPassword' && <RecoverPassword closeModal={closeModal} hideCloseIcon />}
      </Modal>,
      document.body
    )
  );
};

export default PrivateRoutes;
