import React from 'react';
import Modal from 'components/Modal';
import Button from 'components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import MailerService from 'services/mail.service';
import { ROUTER_PATH } from 'App';
import './unsubscribeNewsletter.scss';

// TODO：取消電子報畫面
const UnsubscribeNewsletter = () => {
  // TODO：從url中抓取email
  // 使用useParams來獲取URL中的變數
  const { email } = useParams();
  const navigate = useNavigate();

  const handleUnsubscribe = async () => {
    // TODO：串接 API
    try {
      const res = await MailerService.unsubscribeNewsletter(email);
      console.log({ res });
      console.log(res.data.message);
    } catch (err) {
      console.log({ err });
      console.log(err.data.message);
    }
  };

  const handleCancel = () => {
    navigate(ROUTER_PATH.home);
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
