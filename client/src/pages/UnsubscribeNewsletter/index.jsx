import React from 'react';
import Modal from 'components/Modal';
import Button from 'components/Button';
import './unsubscribeNewsletter.scss';

// TODO: 取消釘子報畫面
const UnsubscribeNewsletter = () => {
  // TODO：從url中抓取email

  const handleUnsubscribe = () => {
    // TODO：串接 API
  };

  const handleCancel = () => {
    // TODO：回主畫面
  };

  return (
    <Modal isCovered>
      <div className='unsubscribe-content'>
        <h1>Unsubscribe newsletter</h1>
        <p>No longer wish to receive our newsletter?</p>
        <div className='btn-container'>
          <Button onClick={handleUnsubscribe}>Unsubscribe</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </div>
      </div>
    </Modal>
  );
};

export default UnsubscribeNewsletter;
