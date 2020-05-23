import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserForm from '../../components/UserForm';
import { getUser } from '../../store/user/actions';

export default function UserSettings() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  useEffect(() => {
    dispatch(getUser());
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [dispatch]);

  return (
    <>
      <div>
        <UserForm user={user} />
      </div>
    </>
  );
}
