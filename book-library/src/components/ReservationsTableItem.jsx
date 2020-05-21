/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkInReservation,
  removeWaiting,
} from '../store/reservations/actions';
import CheckInForm from './CheckInForm';
import Modal from './Modal';
import ReservationModalContent from './ReservationModalContent';
import { formatDate } from '../utilities/dateHalper';

const ReservationsTableItem = ({ data }) => {
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState(false);
  const [checkInModalState, setCheckInModalState] = useState(false);
  const [review, setReview] = useState('');
  //TODO: This will have interesting results if we use it as an admin.
  const userId = useSelector((state) => state.user.loggedInUserId);

  const handleModalClick = () => {
    setModalState(true);
  };

  const onConfirmClick = () => {
    dispatch(
      checkInReservation(
        data.id,
        userId,
        data.user === null || data.user.id === userId ? review : ''
      )
    );
    setCheckInModalState(false);
  };

  const onLeaveWaitlist = () => {
    dispatch(removeWaiting(data.id, userId));
  };

  return (
    <tr key={data.id}>
      <Modal
        modalState={checkInModalState}
        exitAction={() => setCheckInModalState(false)}
        height="400px"
        width="400px"
      >
        {data.user === null || data.user.id === userId ? (
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
        <img src={data.book.coverPictureUrl} alt="" />
        <span>{data.book.title}</span>
        <span>{data.book.author}</span>
      </td>
      <td>
        <span>{data.office.name}</span>
      </td>
      <td>
        <span>{data.status}</span>
      </td>
      <td>{formatDate(data.bookedFrom)}</td>
      <td>{formatDate(data.returnDate)}</td>
      {data.status === 'Borrowed' ? (
        <td>
          <Modal
            modalState={modalState}
            exitAction={() => setModalState(false)}
            height="auto"
            width="400px"
          >
            <ReservationModalContent
              reservation={data}
              onExit={() => setModalState(false)}
            />
          </Modal>
          <button onClick={() => handleModalClick()}>Edit</button>
          <button onClick={() => setCheckInModalState(true)}>Check In</button>
        </td>
      ) : (
        data.status === 'Waiting' && (
          <td>
            <button onClick={onLeaveWaitlist}>Leave waitlist</button>
          </td>
        )
      )}
    </tr>
  );
};

export default ReservationsTableItem;
