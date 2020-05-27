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
    // debugger;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  }

  function onLoginClick() {
    dispatch(login(credentials));
  }

  return (
    <div>
      <div>
        <label>Email</label>
        <input
          onChange={(e) => handleChange(e)}
          name="Email"
          value={credentials.Email}
          placeholder="example@email.com"
        />
        <label>Password</label>
        <input
          onChange={(e) => handleChange(e)}
          name="Password"
          value={credentials.Password}
          placeholder="password123"
        />
      </div>
      <Button onClick={() => onLoginClick()}>Login</Button>
      <Button onClick={() => history.push('/registration')}>Register</Button>
    </div>
  );
}
