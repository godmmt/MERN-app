import React, { useRef, useState } from 'react';
import Button from 'components/Button';
import MailerService from 'services/mail.service';
import { useModal } from 'hooks';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import './resetPassword.scss';

const ResetPassword = ({ hideCloseIcon }) => {
  const { closeModal, openLoginModal } = useModal();
  const [msgForUser, setMsgForUser] = useState('');
  // useRef
  const emailRef = useRef(null);

  const sendPasswordResetEmail = async () => {
    const email = emailRef.current.value;
    console.log(email);
    if (!email) {
      return setMsgForUser('Please enter an email.');
    }
    // 打找回密碼api
    setMsgForUser('Hold on, we are coming...');
    try {
      const res = await MailerService.resetPassword(email);
      console.log({ res });
      setMsgForUser(res.data.message);
    } catch (err) {
      console.log({ err });
      setMsgForUser(err.data.message);
    }
  };

  return (
    <div className='reset-password'>
      <h1>Forget Password</h1>
      <FontAwesomeIcon icon={faCircleXmark} onClick={closeModal} className={`close-icon  ${hideCloseIcon ? 'hide-close-icon' : ''}`} />

      <main>
        <p>Enter your email to reset password:</p>
        <input type='text' placeholder='Email' ref={emailRef} />

        {msgForUser && <div className='msg-for-user'>{msgForUser}</div>}

        <Button cx='send-password-reset-email-btn' onClick={sendPasswordResetEmail}>
          Reset Password
        </Button>
      </main>

      <div className='click-sign-up'>
        <span onClick={openLoginModal}>Back to Login</span>
      </div>
    </div>
  );
};

export default ResetPassword;
