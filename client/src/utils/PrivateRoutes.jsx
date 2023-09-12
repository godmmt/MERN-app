import React from 'react';
import { Outlet } from 'react-router-dom';

const PrivateRoutes = ({ currentUser, setIsModalOpen }) => {
  return currentUser ? <Outlet /> : setIsModalOpen(true);
};

export default PrivateRoutes;
