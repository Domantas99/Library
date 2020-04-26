/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookAvailability } from "../store/library/actions";

export default function BookAvailabilitySection({ bookId }) {
  const dispatch = useDispatch();
  const bookInOffices = useSelector((state) => state.library.bookAvailability);

  useEffect(() => {
    dispatch(getBookAvailability(bookId));
  }, [dispatch, bookId]);

  return (
    <div className="ba-section">
      <div>
        <h3>Reserved by</h3>
      </div>
      {bookInOffices.length > 0 ? (
        <div className="ba-section-list">
        {bookInOffices.map((d) => (
          <div className="ba-section-list-item">
            <div className="ba-section-list-item-text-title">{d.office.name} office</div>
            {d.count > 0 ? (
              <div className="ba-section-list-item-text-available">{d.count} available</div>
            ) : (
              <div className="ba-section-list-item-text-unavailable">Currently unavailable</div>
            )}
            <div className="ba-section-list-item-text-address">{d.office.fullAddress}</div>
            {d.count > 0 &&
              <div className="ba-section-list-item-text-other">Can't find a copy?</div>
            }
            </div>
          ))}
      </div>
): <div>Book is not added</div>
      }
      <div className="ba-section-buttons">
        <div>
          <button className="ba-section-buttons-dark">Enter waitlist</button>
        </div>
        <div>
          <button className="ba-section-buttons-light">Who else waiting?</button>
        </div>
      </div>
    </div>
  );
}
