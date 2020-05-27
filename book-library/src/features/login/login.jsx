import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components';
import { login } from '../../store/user/actions';

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    Email: 'admin@library.com',
    Password: 'Password1!',
  });

  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  }

  function onLoginClick() {
    dispatch(login(credentials));
  }

  return (
    <div className="auth">
      <h1 className="auth-title">Login to library</h1>
      <div className="auth-form">
        <div className="auth-form-block">
          <label className="auth-form-label">Email</label>
          <input
            className="auth-form-input"
            onChange={(e) => handleChange(e)}
            name="Email"
            value={credentials.Email}
            placeholder="example@email.com"
          />
        </div>
        <div className="auth-form-block">
          <label className="auth-form-label">Password</label>
          <input
            type="password"
            className="auth-form-input"
            onChange={(e) => handleChange(e)}
            name="Password"
            value={credentials.Password}
            placeholder="Enter your password"
          />
        </div>
      </div>
      <div className=" auth-form-buttons">
        <Button onClick={() => onLoginClick()}>Login</Button>
        <Button onClick={() => history.push('/registration')}>Register</Button>
      </div>
    </div>
  );
}
