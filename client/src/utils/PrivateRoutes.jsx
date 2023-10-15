import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useCurrentUser from 'hooks/useCurrentUser';
import Modal from 'components/Modal';
import useModal from 'hooks/useModal';

const PrivateRoutes = () => {
  const { currentUser } = useCurrentUser();
  const { openLoginModal, modalType } = useModal();
  useEffect(() => {
    if (!currentUser && !modalType) {
      openLoginModal();
    }
  }, [currentUser, modalType, openLoginModal]);

  return currentUser ? <Outlet /> : <Modal disallowClose />;
};

export default PrivateRoutes;
