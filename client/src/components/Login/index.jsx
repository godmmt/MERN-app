import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ROUTER_PATH } from 'App';
import AuthService from 'services/auth.service';
import Button from 'components/Button';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import './login.scss';

const Login = ({ setCurrentUser, handleCloseLoginModal, setHasAccount }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const res = await AuthService.login(email, password);
      localStorage.setItem('user', JSON.stringify(res.data));
      window.alert('Login successfully, now you are redirect to the profile page.');
      setCurrentUser(res.data);
      navigate(ROUTER_PATH.profile);
      handleCloseLoginModal();
    } catch (error) {
      setMessage(error.response.data);
    }
  };

  return (
    <div className='login-content'>
      <h1>Login</h1>
      <FontAwesomeIcon onClick={handleCloseLoginModal} icon={faCircleXmark} className='close-icon' />

      <main>
        <div className='inputs'>
          <input onChange={handleChangeEmail} type='text' name='email' placeholder='Email' />
          <div className='input-password'>
            <input onChange={handleChangePassword} type={isPasswordVisible ? 'text' : 'password'} name='password' placeholder='Password' />
            <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} className='eye-icon' onClick={togglePasswordVisibility} />
          </div>
        </div>
        {message && <div className='alert'>{message}</div>}
        <div className='forgot-password'>
          <span>Forgot your password?</span>
        </div>
        <Button cx='login-btn' onClick={handleLogin}>
          Login
        </Button>
      </main>
      <div className='click-sign-up'>
        <span onClick={() => setHasAccount(false)}>Click to Sign Up!</span>
      </div>
    </div>
  );
};

export default Login;
