import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from 'services/auth.service';

const Register = () => {
  const navigate = useNavigate();
  let [username, setUsername] = useState(''); // Wilson用let
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [role, setRole] = useState('');
  let [message, setMessage] = useState('');

  const handleChangeUsername = (e) => {
    // onChange是一個EventListener,可以用e.target
    setUsername(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };
  const handleRegister = () => {
    AuthService.register(username, email, password, role)
      .then(() => {
        window.alert(
          'Registration succeeds. You are now redirected to the login page.'
        );
        navigate('/login');
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div style={{ padding: '3rem' }} className='col-md-12'>
      <div>
        {message && <div className='alert alert-danger'>{message}</div>}
        <div>
          <label htmlFor='username'>Username</label>
          <input
            onChange={handleChangeUsername}
            type='text'
            className='form-control'
            name='username'
          />
        </div>
        <br />
        <div className='form-group'>
          <label htmlFor='email'>email</label>
          <input
            onChange={handleChangeEmail}
            type='text'
            className='form-control'
            name='email'
          />
        </div>
        <br />
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            onChange={handleChangePassword}
            type='password'
            className='form-control'
            name='password'
          />
        </div>
        <br />
        <div className='form-group'>
          <label htmlFor='password'>role</label>
          <input
            onChange={handleChangeRole}
            type='text'
            className='form-control'
            name='role'
          />
        </div>
        <br />
        <button onClick={handleRegister} className='btn btn-primary'>
          <span>Register</span>
        </button>
      </div>
    </div>
  );
};

export default Register;
