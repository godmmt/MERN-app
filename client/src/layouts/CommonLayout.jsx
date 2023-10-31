import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'components/Header';
import Footer from 'components/Footer';
import useScrollToTopWhenRouteChange from 'hooks/useScrollToTopWhenRouteChange';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTopBtn from 'components/ScrollToTopBtn';

const CommonLayout = () => {
  useScrollToTopWhenRouteChange();
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ScrollToTopBtn />
      <ToastContainer
        position='top-left'
        autoClose={3000}
        limit={5}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme='light'
      />
    </>
  );
};

export default CommonLayout;
