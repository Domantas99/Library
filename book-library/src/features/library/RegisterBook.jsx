/* eslint-disable no-param-reassign */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BookForm, Panel } from '../../components';
import { addNewBook } from '../../store/library/actions';

const RegisterBook = () => {
  const dispatch = useDispatch();
  const offices = useSelector((state) => state.office.offices);
  offices.forEach((o) => {
    o.count = 0;
  });

  const handleSubmit = (book) => {
    dispatch(addNewBook(book));
  };

  return (
    <Panel title="Register new book">
      <BookForm
        formTitle="Register new book"
        offices={offices}
        buttonText="Register"
        onSubmit={handleSubmit}
      />
    </Panel>
  );
};

export default RegisterBook;
