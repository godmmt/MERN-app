import React from 'react';
import './modal.scss';

const Modal = ({ onClose, children }) => {
  return (
    <div className='modal-backdrop' onClick={onClose}>
      <div
        className='modal-container'
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;