import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components';
import { getOffices } from '../../store/office/actions';
import { register } from '../../store/user/actions';

export default function Registration() {
  const dispatch = useDispatch();
  const history = useHistory();
  const offices = useSelector((state) => state.office.offices);
  const [userData, setUserData] = useState({
    Email: 'admin@library.com',
    FullName: '',
    OfficeId: 1,
    Password: 'Password1!',
    PasswordRepeat: 'Password1!',
  });

  useEffect(() => {
    // dispatch(getOffices());
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    // debugger;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function onSubmitClick() {
    dispatch(register(userData));
  }

  return (
    <div>
      <h1>Registration</h1>
      <div>
        <label>Email</label>
        <input
          onChange={(e) => handleChange(e)}
          name="Email"
          value={userData.Email}
          placeholder="example@email.com"
        />
        <label>Full Name</label>
        <input
          onChange={(e) => handleChange(e)}
          name="FullName"
          value={userData.FullName}
          placeholder="James Smith"
        />
        <label>Office</label>
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
        <label>Password</label>
        <input
          onChange={(e) => handleChange(e)}
          name="Password"
          value={userData.Password}
          placeholder="password123"
        />
        <label>Repeat Password</label>
        <input
          onChange={(e) => handleChange(e)}
          name="PasswordRepeat"
          value={userData.PasswordRepeat}
          placeholder="password123"
        />
      </div>
      <Button onClick={() => onSubmitClick()}>Create an account</Button>
      <Button onClick={() => history.push('/login')}>Back</Button>
    </div>
  );
}
