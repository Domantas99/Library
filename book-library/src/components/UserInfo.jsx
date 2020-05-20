/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/user/actions";

export default function UserInfo() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const loggedInUserId = useSelector((state) => state.user.defaultLoggedInUserId);
  
  useEffect(() => {
    dispatch(getUser(loggedInUserId));
  }, [dispatch, loggedInUserId]);

  return (
    <div className="user-info">
      <div className="user-info__image">
        <img src={user?.profilePictureUrl} alt=""/>
      </div>
      <h2 className="user-info__greeting">Hello, {user?.fullName}!</h2>
      <h5 className="text-secondary">{user?.email}</h5>
      <h5 className="text-secondary">{user?.office?.name} office</h5>
    </div>
  );
}
