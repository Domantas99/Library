/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../store/user/actions';
import UserImage from './UserImage';

export default function UserInfo() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className="user-info">
      {user?.id && (
        <>
          <UserImage url={user?.profilePictureUrl} />
          <h2 className="user-info__greeting">Hello, {user?.fullName}!</h2>
          <h5 className="text-secondary">{user?.email}</h5>
          <h5 className="text-secondary">{user?.office?.name} office</h5>
        </>
      )}
    </div>
  );
}
