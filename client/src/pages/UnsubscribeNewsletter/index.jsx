import React, { useRef, useState } from 'react';
import Button from 'components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import MailerService from 'services/mail.service';
import { ROUTER_PATH } from 'App';
import './unsubscribeNewsletter.scss';

const UnsubscribeNewsletter = () => {
  // 使用useParams來獲取URL中的變數
  const { email } = useParams();
  const endMsgRef = useRef();
  const [closeModal, setCloseModal] = useState(false);
  const navigate = useNavigate();
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const hideButton = () => {
    setIsButtonVisible(false);
    console.log('Hide button');
  };
  const showButton = () => {
    setIsButtonVisible(true);
    console.log('Show button');
  };

  const handleUnsubscribe = async () => {
    hideButton();
    try {
      const res = await MailerService.unsubscribeNewsletter(email);
      window.alert(res.data.message);
      endMsgRef.current.innerText = 'Unsubscribe successfully';
      setCloseModal(true);
    } catch (err) {
      window.alert(err.data.message);
      showButton();
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
          <Button cx={`unsubscribe-btn ${isButtonVisible ? '' : 'hide-button'}`} onClick={handleUnsubscribe}>
            Unsubscribe
          </Button>
          <Button cx={isButtonVisible ? '' : 'hide-button'} onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </div>
      <div className='end-msg' ref={endMsgRef}></div>
    </main>
  );
};

export default UnsubscribeNewsletter;
