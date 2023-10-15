import React from 'react';
import { Outlet } from 'react-router-dom';
import useCurrentUser from 'hooks/useCurrentUser';
import Modal from 'components/Modal';
import useModal from 'hooks/useModal';

const PrivateRoutes = () => {
  const { currentUser } = useCurrentUser();
  const { openLoginModal, modalType } = useModal();

  return (
    <>
      {currentUser && <Outlet />}
      {!currentUser && <main>TEST</main>}
      {!currentUser && <Modal hideCloseIcon />}
      {!currentUser && !modalType && openLoginModal()}
    </>
  );
};

export default PrivateRoutes;
