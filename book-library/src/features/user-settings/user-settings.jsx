import React, {useEffect} from 'react';
import UserForm from '../../components/UserForm';
import { getUser } from '../../store/user/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function UserSettings() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userData);
    useEffect(() => {
      dispatch(getUser(1));
    }, [dispatch]);
    
  return (
    <>
        <div>
            <UserForm user={user}></UserForm>
        </div>
    </>
  );
}
