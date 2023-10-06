import React from 'react';
import { Outlet } from 'react-router-dom';
import { createPortal } from 'react-dom';
import Modal from 'components/Modal';
import Login from 'components/Login';
import ResetPassword from 'components/ResetPassword';
import { useCurrentUser, useModal } from 'hooks';
import Register from 'components/Register';

const PrivateRoutes = () => {
  const { currentUser } = useCurrentUser();
  const { isLogin, isRegister, isResetPassword, modalType } = useModal();

  return currentUser ? (
    <Outlet />
  ) : (
    createPortal(
      <Modal isCovered>
        {!modalType && <Login hideCloseIcon />}
        {isLogin && <Login hideCloseIcon />}
        {isRegister && <Register hideCloseIcon />}
        {isResetPassword && <ResetPassword hideCloseIcon />}
      </Modal>,
      document.body
    )
  );
};

export default PrivateRoutes;
