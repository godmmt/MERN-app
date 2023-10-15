import React, { useState } from 'react';
import AuthService from 'services/auth.service';
import Button from 'components/Button';
import useModal from 'hooks/useModal';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './login.scss';
import useCurrentUser from 'hooks/useCurrentUser';

const Login = () => {
  const { closeModal, openRegisterModal, openResetPasswordModal } = useModal();
  const { login } = useCurrentUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setMessage('');
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setMessage('');
  };

  const handleLogin = async () => {
    try {
      const res = await AuthService.login(email, password);
      const { value } = res.data;
      login(value);
      closeModal();
    } catch (error) {
      setMessage(error.data.message);
    }
  };

  return (
    <div className='login-content'>
      <h1>Login</h1>
      <main>
        <div className='inputs'>
          <input onChange={handleChangeEmail} type='text' placeholder='Email' />
          <div className='input-password'>
            <input onChange={handleChangePassword} type={isPasswordVisible ? 'text' : 'password'} placeholder='Password' />
            <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} className='eye-icon' onClick={togglePasswordVisibility} />
          </div>
        </div>
        {message && <div className='alert'>{message}</div>}
        <div className='forgot-password'>
          <span onClick={openResetPasswordModal}>Forgot your password?</span>
        </div>
        <Button cx='login-btn' onClick={handleLogin}>
          Login
        </Button>
      </main>
      <div className='click-sign-up'>
        <span onClick={openRegisterModal}>Click to Sign Up!</span>
      </div>
    </div>
  );
};

export default Login;
