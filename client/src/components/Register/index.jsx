import React, { useState } from 'react';
import AuthService from 'services/auth.service';
import Button from 'components/Button';
import useModal from 'hooks/useModal';
import { toast } from 'react-toastify';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './register.scss';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { openLoginModal } = useModal();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  // onChange是一個EventListener,可以用e.target
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };

  const handleRegister = async () => {
    try {
      const res = await AuthService.register(username, email, password, role);
      toast.success(res.data.message);
      openLoginModal();
    } catch (err) {
      setMessage(err.data.message);
    }
  };

  return (
    <div className='register-content'>
      <h1>Register</h1>

      <main>
        <div className='inputs'>
          <input onChange={handleChangeUsername} type='text' name='username' placeholder='Username' />
          <input onChange={handleChangeEmail} type='text' name='email' placeholder='Email' />
          <div className='input-password'>
            <input onChange={handleChangePassword} type={isPasswordVisible ? 'text' : 'password'} name='password' placeholder='Password' />
            <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} className='eye-icon' onClick={togglePasswordVisibility} />
          </div>

          <select name='role' onChange={handleChangeRole}>
            <option hidden>Choose Your Role:</option>
            <option value='student'>Student</option>
            <option value='instructor'>Instructor</option>
          </select>
        </div>

        {message && <div className='alert'>{message}</div>}

        <Button cx='register-btn' onClick={handleRegister}>
          Register
        </Button>
      </main>

      <div className='click-login'>
        <span onClick={openLoginModal}>Click to Login!</span>
      </div>
    </div>
  );
};

export default Register;
