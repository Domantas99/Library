import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOffices } from '../store/office/actions';
import { updateUser } from '../store/user/actions';
import UserImage from './UserImage';
import { Button } from '../components';
import Select from './Select';

export default function UserForm({ user }) {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(user);
  const offices = useSelector((state) => state.office.offices);

  const handleChange = (name, value) => {
    if (name === 'officeId') {
      setUserInfo({ ...userInfo, officeId: value, office: offices[value - 1] });
    } else {
      setUserInfo({ ...userInfo, [name]: value });
    }
  };

  useEffect(() => {
    setUserInfo(user);
    dispatch(getOffices());
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [user]);

  function OnSaveClick() {
    dispatch(updateUser(userInfo));
  }

  const officeSelections = offices.map((o) => ({value: o.id, label: o.name}));
  const currentOffice = officeSelections.find(o => o.value === userInfo?.officeId);

  return (
    <div>
      <UserImage url={userInfo?.profilePictureUrl} big />
      <form noValidate onSubmit={() => OnSaveClick()} className="form">
        <div className="form__field">
          <label htmlFor="profilePictureUrl">PROFILE PICTURE URL</label>
          <br />
          <input
            type="text"
            value={userInfo?.profilePictureUrl}
            name="profilePictureUrl"
            onChange={handleChange}
          />
        </div>
        <div className="form__field">
          <label htmlFor="fullName">FULL NAME</label>
          <br />
          <input
            type="text"
            value={userInfo?.fullName}
            name="fullName"
            onChange={handleChange}
          />
        </div>

        <div className="form__field">
          <label htmlFor="role">Role</label>
          <br />
          <input
            type="text"
            value={userInfo?.role}
            name="role"
            onChange={handleChange}
          />
        </div>

        <div className="form__field">
          <label htmlFor="officeId">DEFAULT OFFICE</label>
          <br />
          <Select
            name="officeId"
            value={currentOffice}
            onChange={(value) => handleChange('officeId', value.value)}
            options={officeSelections}
          />
        </div>

        <div className="form__field">
          <label htmlFor="email">EMAIL ADDRESS</label>
          <br />
          <input
            type="text"
            value={userInfo?.email}
            name="email"
            onChange={handleChange}
          />
        </div>

        <div className="form__field">
          <label htmlFor="phoneNumber">PHONE</label>
          <br />
          <input
            type="text"
            value={userInfo?.phoneNumber}
            name="phoneNumber"
            onChange={handleChange}
          />
        </div>

        <div className="form__field">
          <label htmlFor="goodReadsAccount">GOOD READS ACCOUNT</label>
          <br />
          <input
            type="text"
            value={userInfo?.goodReadsAccount}
            name="goodReadsAccount"
            onChange={handleChange}
          />
        </div>

        <Button type="submit">Save changes</Button>
      </form>
    </div>
  );
}
