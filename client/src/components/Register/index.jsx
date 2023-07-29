import React, { useState } from 'react';
import AuthService from 'services/auth.service';
import Button from 'components/Button';
import './register.scss';

const Register = ({ setHasAccount, handleCloseLoginModal }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

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
      await AuthService.register(username, email, password, role);
      window.alert(
        'Registration succeeds. You are now redirected to the login page.'
      );
      // navigate(ROUTER_PATH.home);
      setHasAccount(true);
    } catch (error) {
      console.log(error.response);
      setMessage(error.response.data);
    }
  };

  return (
    <div className='register-content'>
      <h1>Register</h1>
      <main>
        <div className='inputs'>
          <input
            onChange={handleChangeUsername}
            type='text'
            name='username'
            placeholder='Username'
          />
          <input
            onChange={handleChangeEmail}
            type='text'
            name='email'
            placeholder='Email'
          />
          <input
            onChange={handleChangePassword}
            type='password'
            name='password'
            placeholder='Password'
          />
          <select name='role' onChange={handleChangeRole}>
            <option disabled selected>
              Choose your role:
            </option>
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
        <span onClick={() => setHasAccount(true)}>Click to login!</span>
      </div>
    </div>
  );
};

export default Register;
