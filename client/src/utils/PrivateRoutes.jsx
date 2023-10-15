import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useCurrentUser from 'hooks/useCurrentUser';
import Modal from 'components/Modal';
import useModal from 'hooks/useModal';

const PrivateRoutes = () => {
  const { hasUser } = useCurrentUser();
  const { openLoginModal, modalType } = useModal();
  useEffect(() => {
    if (!hasUser && !modalType) {
      openLoginModal();
    }
  }, [hasUser, modalType, openLoginModal]);

  return hasUser ? <Outlet /> : <Modal allowCloseModal={false} />;
};

export default PrivateRoutes;
