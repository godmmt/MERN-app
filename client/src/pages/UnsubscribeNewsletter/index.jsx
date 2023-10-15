import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTER_PATH } from 'App';
import MailerService from 'services/mail.service';
import Button from 'components/Button';
import './unsubscribeNewsletter.scss';

const UnsubscribeNewsletter = () => {
  // 使用useParams來獲取URL中的變數
  const { email } = useParams();
  const endMsgRef = useRef();
  const [closeModal, setCloseModal] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUnsubscribe = async () => {
    setLoading(true);
    try {
      const res = await MailerService.unsubscribeNewsletter(email);
      window.alert(res.data.message);
      endMsgRef.current.innerText = 'Unsubscribe successfully';
      setCloseModal(true);
    } catch (err) {
      window.alert(err.data.message);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(ROUTER_PATH.home);
  };

  return (
    <main className='unsubscribe-content'>
      <div className={`unsubscribe-content-modal ${closeModal ? 'close-modal' : ''}`}>
        <h1>Unsubscribe newsletter</h1>
        <p>No longer wish to receive our newsletter?</p>
        <div className='btn-container'>
          <Button loading={loading} cx='unsubscribe-btn' onClick={handleUnsubscribe}>
            Unsubscribe
          </Button>
          <Button loading={loading} onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </div>
      <div className='end-msg' ref={endMsgRef}></div>
    </main>
  );
};

export default UnsubscribeNewsletter;
