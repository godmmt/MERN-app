import { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';

export const ModalContext = createContext();

// modal type configuration
const MODAL_TYPE = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  RESET_PASSWORD: 'RESET_PASSWORD',
};

const ModalProvider = () => {
  const [modalType, setModalType] = useState(null);

  const closeModal = () => {
    setModalType(null);
  };

  const openLoginModal = () => {
    setModalType(MODAL_TYPE.LOGIN);
  };
  const openRegisterModal = () => {
    setModalType(MODAL_TYPE.REGISTER);
  };
  const openResetPasswordModal = () => {
    setModalType(MODAL_TYPE.RESET_PASSWORD);
  };

  const value = {
    isLogin: modalType === MODAL_TYPE.LOGIN,
    isRegister: modalType === MODAL_TYPE.REGISTER,
    isResetPassword: modalType === MODAL_TYPE.RESET_PASSWORD,
    modalType,
    closeModal,
    openLoginModal,
    openRegisterModal,
    openResetPasswordModal,
  };

  return (
    <ModalContext.Provider value={value}>
      <Outlet />
    </ModalContext.Provider>
  );
};

export default ModalProvider;
