/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BookForm, Panel } from '../../components';
import { getBookDetails, updateBook } from '../../store/library/actions';

const EditBook = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const bookDetails = useSelector((state) => state.library.bookDetails);
  const offices = useSelector((state) => state.office.offices);
  offices.forEach((o) => {
    o.count =
      bookDetails?.library?.find((x) => x.officeId === o.id)?.count || 0;
  });

  useEffect(() => {
    dispatch(getBookDetails(id));
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [id]);

  const handleSubmit = (book) => {
    dispatch(updateBook(id, book));
  };

  return id ? (
    <Panel title="Edit Book">
      {bookDetails && offices.length !== 0 && bookDetails.length !== 0 && (
        <BookForm
          bookDetails={bookDetails.book}
          buttonText="Save"
          onSubmit={handleSubmit}
          id={id}
          offices={offices}
        />
      )}
    </Panel>
  ) : (
    <Link to="/">Return home</Link>
  );
};

export default EditBook;
