import React, { useState } from 'react';
import AuthService from 'services/auth.service';
import Button from 'components/Button';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useCurrentUser } from 'hooks';
import './login.scss';

const Login = ({ closeModal, openRecoverPasswordModal, openRegisterModal, hideCloseIcon }) => {
  const { setCurrentUser } = useCurrentUser();

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
      const res = await AuthService.login(email, password); // 接住伺服器回傳的物件(成為被包在res物件裡面的data物件)
      localStorage.setItem('user', JSON.stringify(res.data));
      window.alert('Login successfully.');
      setCurrentUser(res.data);
      closeModal();
    } catch (error) {
      setMessage(error.data.message);
    }
  };

  return (
    <div className='login-content'>
      <h1>Login</h1>
      <FontAwesomeIcon onClick={closeModal} icon={faCircleXmark} className={`close-icon  ${hideCloseIcon ? 'hide-close-icon' : ''}`} />

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
          <span onClick={openRecoverPasswordModal}>Forgot your password?</span>
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
