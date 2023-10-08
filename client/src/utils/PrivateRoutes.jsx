import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useCurrentUser } from 'hooks';
import { useModal } from 'hooks';

const PrivateRoutes = () => {
  const { currentUser } = useCurrentUser();
  const { openLoginModal, onHideCloseIcon } = useModal();

  useEffect(() => {
    if (!currentUser) {
      openLoginModal();
      onHideCloseIcon();
    }
  }, [currentUser]);

  return currentUser ? <Outlet /> : <main style={{ height: '100vh' }}></main>;
};

export default PrivateRoutes;
