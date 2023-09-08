import React from 'react';
import Button from 'components/Button';
import './loginWarning.scss';

const LoginWarning = (props) => {
  const { currentUser, setIsModalOpen } = props;
  const handleTakeToLogin = () => {
    setIsModalOpen(true);
  };

  return (
    <div className='login-warning'>
      {!currentUser && (
        <div className='msg-not-login'>
          <h1>You must login first.</h1>
          <Button cx='go-login-btn' onClick={handleTakeToLogin}>
            Login
          </Button>
        </div>
      )}
    </div>
  );
};

export default LoginWarning;
