/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BookForm } from "../../components";
import { getOffices } from "../../store/office/actions";

export default () => {
  const dispatch = useDispatch();
  const offices = useSelector((state) => state.office.offices);
  offices.forEach((o) => (o.count = 0));
  useEffect(() => {
    dispatch(getOffices());
  }, []);

  return (
    <div className="content-wrapper">
      <BookForm formTitle="Register" offices={offices} />
    </div>
  );
};
