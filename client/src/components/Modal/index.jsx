import React from 'react';
import { createPortal } from 'react-dom';
import { useCurrentUser, useModal } from 'hooks';
import Login from 'components/Login';
import Register from 'components/Register';
import ResetPassword from 'components/ResetPassword';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import './modal.scss';

const Modal = () => {
  const { modalType, closeModal, isLogin, isRegister, isResetPassword } = useModal();
  const { currentUser } = useCurrentUser();

  // TODO: 在Private Routes時候固定開啟Modal
  // const hideCloseIcon = () => {
  //   return currentUser ? true : false;
  // };

  return (
    modalType &&
    createPortal(
      <div className='modal-backdrop' onClick={closeModal}>
        <div className='modal-content' onClick={(event) => event.stopPropagation()}>
          {/* <FontAwesomeIcon onClick={closeModal} icon={faCircleXmark} className={`close-icon  ${hideCloseIcon ? 'hide-close-icon' : ''}`} /> */}
          <FontAwesomeIcon onClick={closeModal} icon={faCircleXmark} className={`close-icon`} />

          {isLogin && <Login />}
          {isRegister && <Register />}
          {isResetPassword && <ResetPassword />}
        </div>
      </div>,
      document.body
    )
  );
};

export default Modal;
