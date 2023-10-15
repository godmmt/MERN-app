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

const Modal = ({ hideCloseIcon }) => {
  const { modalType, closeModal, isLogin, isRegister, isResetPassword } = useModal();

  console.log('Modal');
  // TODO: 在Private Routes時候固定開啟Modal

  return (
    modalType &&
    createPortal(
      <div className='modal-backdrop' onClick={closeModal}>
        <div className='modal-content' onClick={(event) => event.stopPropagation()}>
          <FontAwesomeIcon onClick={closeModal} icon={faCircleXmark} className={`close-icon ${hideCloseIcon ? 'hide-close-icon' : ''}`} />

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
