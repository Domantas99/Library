/* eslint-disable no-bitwise */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkInReservation } from '../store/reservations/actions';
import CheckInForm from './CheckInForm';
import Modal from './Modal';
import ReservationModalContent from './ReservationModalContent';
import Button, { BUTTON_APPEARANCE } from './Button';
import ReturnDate from './ReturnDate';

const ReservationsTableItem = ({ data, waitlistLeaveAction }) => {
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState(false);
  const [checkInModalState, setCheckInModalState] = useState(false);
  const [review, setReview] = useState('');

  const handleModalClick = () => {
    setModalState(true);
  };

  const onConfirmClick = () => {
    dispatch(checkInReservation(data.id, data.user === null ? review : ''));
    setCheckInModalState(false);
  };

  const onLeaveWaitlist = () => {
    dispatch(waitlistLeaveAction(data.id));
  };

  return (
    <tr key={data.id}>
      <Modal
        modalState={checkInModalState}
        exitAction={() => setCheckInModalState(false)}
      >
        {data.user === null ? (
          <CheckInForm
            onCancel={() => setCheckInModalState(false)}
            reservation={data}
            onConfirm={() => onConfirmClick()}
            reviewValue={review}
            reviewHandler={setReview}
          />
        ) : (
          <CheckInForm
            onCancel={() => setCheckInModalState(false)}
            reservation={data}
            onConfirm={() => onConfirmClick()}
          />
        )}
      </Modal>
      {data.user && (
        <td>
          <span>{data.user.userName}</span>
        </td>
      )}
      <td>
        <div className="reservations-table__book">
          <Link
            to={`/library/${data.book.id}`}
            className="reservations-table__image"
          >
            <img src={data.book.coverPictureUrl} alt="" />
          </Link>
          <div className="reservations-table__book-info">
            <Link
              to={`/library/${data.book.id}`}
              className="reservations-table__title"
            >
              {data.book.title}
            </Link>
            <span className="reservations-table__author">
              {data.book.author}
            </span>
          </div>
        </div>
      </td>
      <td>
        <span>{data.office.name}</span>
      </td>
      <td>
        <span
          className={`reservations-table__status reservations-table__status--${_.toLower(
            data.status
          )}`}
        >
          {data.status}
        </span>
      </td>
      <td>
        <ReturnDate date={data.bookedFrom} />
      </td>
      <td>
        {data.returnDate && (
          <ReturnDate
            validate={data.status === 'Borrowed'}
            date={data.returnDate}
          />
        )}
      </td>
      {data.status === 'Borrowed' ? (
        <td>
          <div className="reservations-table__actions">
            <Modal
              modalState={modalState}
              exitAction={() => setModalState(false)}
            >
              <ReservationModalContent
                reservation={data}
                onExit={() => setModalState(false)}
              />
            </Modal>
            <Button
              buttonAppearance={
                BUTTON_APPEARANCE.SECONDARY | BUTTON_APPEARANCE.MINI
              }
              onClick={() => handleModalClick()}
            >
              Edit
            </Button>
            <Button
              buttonAppearance={BUTTON_APPEARANCE.MINI}
              onClick={() => setCheckInModalState(true)}
            >
              Check In
            </Button>
          </div>
        </td>
      ) : data.status === 'Waiting' ? (
        <td className="reservations-table__actions">
          <div className="reservations-table__actions">
            <Button
              buttonAppearance={
                BUTTON_APPEARANCE.SECONDARY | BUTTON_APPEARANCE.MINI
              }
              onClick={onLeaveWaitlist}
            >
              Leave waitlist
            </Button>
          </div>
        </td>
      ) : (
        <td />
      )}
    </tr>
  );
};

export default ReservationsTableItem;
