import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useCurrentUser from 'hooks/useCurrentUser';
import { ROUTER_PATH } from 'App';

const PrivateRoutes = () => {
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    !currentUser && navigate(ROUTER_PATH.home);
  }, [currentUser, navigate]);

  return currentUser ? <Outlet /> : null;
};

export default PrivateRoutes;
