import React from 'react';
import { Outlet } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import Modal from 'components/Modal';
import Login from 'components/Login';
import { useCurrentUser, useModal } from 'hooks';
import Register from 'components/Register';

const PrivateRoutes = () => {
  const { currentUser } = useCurrentUser();
  const { setIsModalOpen } = useModal();

  const [hasAccount, setHasAccount] = useState(true);
  const handleCloseLoginModal = () => {
    setIsModalOpen(false);
    setHasAccount(true);
  };

  return currentUser ? (
    <Outlet />
  ) : (
    createPortal(
      <Modal onClose={handleCloseLoginModal} isCovered>
        {hasAccount ? (
          <Login handleCloseLoginModal={handleCloseLoginModal} setHasAccount={setHasAccount} hideCloseIcon />
        ) : (
          <Register setHasAccount={setHasAccount} handleCloseLoginModal={handleCloseLoginModal} hideCloseIcon />
        )}
      </Modal>,
      document.body
    )
  );
};

export default PrivateRoutes;
