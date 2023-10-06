import React from 'react';
import { useModal } from 'hooks';
import './modal.scss';

const Modal = ({ children, isCovered }) => {
  const { closeModal } = useModal();
  console.log(isCovered);
  console.log('MODAL');
  return (
    <div className={`modal-backdrop ${isCovered ? 'covered' : ''}`} onClick={closeModal}>
      <div className='modal-content' onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
