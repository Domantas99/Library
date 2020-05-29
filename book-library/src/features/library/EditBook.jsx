/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import { useParams, Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BookForm } from '../../components';
import { getBookDetails } from '../../store/library/actions';

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

  return id ? (
    <div className="content-wrapper">
      {bookDetails && offices.length !== 0 && bookDetails.length !== 0 && (
        <BookForm
          formTitle="Book editing"
          bookDetails={bookDetails.book}
          id={id}
          offices={offices}
        />
      )}
    </div>
  ) : (
    <Link to="/">Return home</Link>
  );
};

export default EditBook;
