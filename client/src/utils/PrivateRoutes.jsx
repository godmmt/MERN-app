import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useCurrentUser from 'hooks/useCurrentUser';
import useModal from 'hooks/useModal';

const PrivateRoutes = () => {
  const { currentUser } = useCurrentUser();
  const { openLoginModal } = useModal();

  useEffect(() => {
    if (!currentUser) {
      openLoginModal();
    }
  }, [currentUser]);

  return currentUser ? <Outlet /> : <main style={{ height: '100vh' }}></main>;
};

export default PrivateRoutes;
