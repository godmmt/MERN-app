import React from 'react';
import './modal.scss';

const Modal = ({ onClose, children, isCovered }) => {
  console.log(isCovered);
  return (
    <div className={`modal-backdrop ${isCovered ? 'covered' : ''}`} onClick={onClose}>
      <div className='modal-content' onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
