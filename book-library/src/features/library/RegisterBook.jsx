/* eslint-disable no-param-reassign */
import React from 'react';
import { useSelector } from 'react-redux';
import { BookForm } from '../../components';

const RegisterBook = () => {
  const offices = useSelector((state) => state.office.offices);
  offices.forEach((o) => {
    o.count = 0;
  });

  return (
    <div className="content-wrapper">
      <BookForm formTitle="Register new book" offices={offices} />
    </div>
  );
};

export default RegisterBook;
