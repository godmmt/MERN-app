import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'components/Header';
import Footer from 'components/Footer';
import useScrollToTopWhenRouteChange from 'hooks/useScrollToTopWhenRouteChange';
// react-toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CommonLayout = () => {
  useScrollToTopWhenRouteChange();
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer
        position='top-center'
        autoClose={3000}
        limit={1}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </>
  );
};

export default CommonLayout;
