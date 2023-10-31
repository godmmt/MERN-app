import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
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
    toast.dismiss(); // clear toasts
    setLoading(true);
    const pendingToastId = toast.loading('Wait a moment . . .');
    try {
      const res = await MailerService.unsubscribeNewsletter(email);
      toast.update(pendingToastId, { render: res.data.message, type: 'success', isLoading: false, closeOnClick: true });
      endMsgRef.current.innerText = 'Unsubscribe successfully';
      setCloseModal(true);
    } catch (err) {
      toast.update(pendingToastId, { render: err.data.message, type: 'error', isLoading: false, closeOnClick: true });
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
      <ToastContainer
        position='top-left'
        autoClose={3000}
        limit={5}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme='light'
      />
    </main>
  );
};

export default UnsubscribeNewsletter;
