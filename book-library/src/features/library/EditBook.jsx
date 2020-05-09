/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BookForm } from "../../components";
import { getBookDetails } from "../../store/library/actions";
import { getOffices } from "../../store/office/actions";

export default () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const bookDetails = useSelector((state) => state.library.bookDetails);
  const offices = useSelector((state) => state.office.offices);
  offices.forEach((o) => (o.count = 0));

  useEffect(() => {
    dispatch(getBookDetails(id));
    dispatch(getOffices());
  }, [dispatch, id]);

  return id ? (
    <div className="content-wrapper">
      {bookDetails && bookDetails.length !== 0 && (
        <BookForm
          formTitle="Book editing"
          bookDetails={bookDetails}
          id={id}
          offices={offices}
        />
      )}
    </div>
  ) : (
    <Link to="/">Return home</Link>
  );
};
