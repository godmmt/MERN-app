import React from 'react';
import { createPortal } from 'react-dom';
import useModal from 'hooks/useModal';
import Login from 'components/Login';
import Register from 'components/Register';
import ResetPassword from 'components/ResetPassword';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import './modal.scss';

const Modal = ({ disallowClose }) => {
  const { modalType, closeModal, isLogin, isRegister, isResetPassword } = useModal();

  return (
    modalType &&
    createPortal(
      <div className='modal-backdrop' onClick={disallowClose ? undefined : closeModal}>
        <div className='modal-content' onClick={(event) => event.stopPropagation()}>
          <FontAwesomeIcon onClick={closeModal} icon={faCircleXmark} className={`close-icon ${disallowClose ? 'hide-close-icon' : ''}`} />

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
