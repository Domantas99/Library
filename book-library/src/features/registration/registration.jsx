import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components';
import { register } from '../../store/user/actions';
import { displayToast } from '../../store/general/actions';

export default function Registration() {
  const dispatch = useDispatch();
  const history = useHistory();
  const offices = useSelector((state) => state.office.offices);
  const [userData, setUserData] = useState({
    Email: '',
    FullName: '',
    OfficeId: 1,
    Password: '',
    PasswordRepeat: '',
  });

  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function validate() {
    if (userData.Password !== userData.PasswordRepeat) {
      return 'Passwords does not match';
    }
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userData.Email) ===
      false
    ) {
      return 'Incorrect email';
    }
    if (userData.FullName.length < 6) {
      return 'Full name should be minimum 6 characters length';
    }
    return 'Successfully registered!';
  }

  function onSubmitClick() {
    const toastMessage = validate();
    const toast = {
      type: 'error',
      message: toastMessage,
      duration: 5000,
      position: 'TOP_CENTER',
    };

    if (toastMessage === 'Successfully registered!') {
      dispatch(register(userData));
      toast.type = 'success';
    }

    dispatch(displayToast(toast));
  }

  return (
    <div className="auth">
      <h1 className="auth-title">Registration</h1>
      <div className="auth-form">
        <div className="auth-form-block">
          <label className="auth-form-label">Email</label>
          <input
            className="auth-form-input"
            onChange={(e) => handleChange(e)}
            name="Email"
            value={userData.Email}
            placeholder="example@email.com"
          />
        </div>
        <div className="auth-form-block">
          <label className="auth-form-label">Full Name</label>
          <input
            className="auth-form-input"
            onChange={(e) => handleChange(e)}
            name="FullName"
            value={userData.FullName}
            placeholder="Enter your full name"
          />
        </div>
        <div className="auth-form-block">
          <label className="auth-form-label">Office</label>
          <select
            onChange={(e) => handleChange(e)}
            name="OfficeId"
            value={userData.OfficeId}
          >
            {offices.map((office) => (
              <option key={office.id} value={office.id}>
                {office.name}
              </option>
            ))}
          </select>
        </div>
        <div className="auth-form-block">
          <label className="auth-form-label">Password</label>
          <input
            type="password"
            className="auth-form-input"
            onChange={(e) => handleChange(e)}
            name="Password"
            value={userData.Password}
            placeholder="Enter your password"
          />
        </div>
        <div className="auth-form-block">
          <label className="auth-form-label">Repeat Password</label>
          <input
            type="password"
            className="auth-form-input"
            onChange={(e) => handleChange(e)}
            name="PasswordRepeat"
            value={userData.PasswordRepeat}
            placeholder="Repeat your password"
          />
        </div>
      </div>
      <div className=" auth-form-buttons">
        <Button onClick={() => onSubmitClick()}>Create an account</Button>
        <Button onClick={() => history.push('/login')}>Back</Button>
      </div>
    </div>
  );
}
