/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BookForm, Panel } from '../../components';
import { getOffices } from '../../store/office/actions';
import { addNewBook } from '../../store/library/actions';

export default () => {
  const dispatch = useDispatch();
  const offices = useSelector((state) => state.office.offices);
  offices.forEach((o) => (o.count = 0));
  useEffect(() => {
    dispatch(getOffices());
  }, [dispatch]);

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
