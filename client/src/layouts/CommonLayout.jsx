import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from 'components/Footer';
import Header from 'components/Header';

const CommonLayout = (props) => {
  const { currentUser, setCurrentUser, isModalOpen, setIsModalOpen } = props;
  return (
    <>
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Outlet />
      <Footer />
    </>
  );
};

export default CommonLayout;
