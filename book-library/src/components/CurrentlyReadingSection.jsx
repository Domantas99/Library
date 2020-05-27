/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkInReservation } from '../store/reservations/actions';
import Button from './Button';
import CheckInForm from './CheckInForm';
import Modal from './Modal';
import ReservationModalContent from './ReservationModalContent';
import { formatDate } from '../utilities/dateHalper';

const CurrentlyReadingSection = ({ reservations }) => {
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState(false);
  const [editModalState, setEditModalState] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState({});

  function onCheckInClick(reservation) {
    setSelectedReservation(reservation);
    setModalState(true);
  }

  function onEditReservationClick(reservation) {
    setSelectedReservation(reservation);
    setEditModalState(true);
  }

  function onFormConfirm() {
    dispatch(checkInReservation(selectedReservation.id, 1));
    setModalState(false);
  }

  return (
    <ul className="currently-reading">
      <Modal
        modalState={modalState}
        exitAction={() => setModalState(false)}
        height="400px"
        width="400px"
      >
        {selectedReservation && selectedReservation.bookCase && (
          <CheckInForm
            reservation={selectedReservation.bookCase}
            onCancel={() => setModalState(false)}
            onConfirm={() => onFormConfirm()}
          />
        )}
      </Modal>

      <Modal
        modalState={editModalState}
        exitAction={() => setEditModalState(false)}
        height="auto"
        width="400px"
      >
        <ReservationModalContent
          Edit
          reservation={selectedReservation}
          onExit={() => setEditModalState(false)}
        />
      </Modal>
      {reservations.map((res) => (
        <li key={res.id} className="currently-reading__item">
          <div className="currently-reading__info">
            <div className="currently-reading__image">
              <img src={res.bookCase.book.coverPictureUrl} alt="" />
            </div>
            <div>
              <h4 className="currently-reading__title">
                {res.bookCase.book.title}
              </h4>
              <h5 className="currently-reading__author">
                {res.bookCase.book.author}
              </h5>
              <h5 className="currently-reading__author">
                {`Return date: ${formatDate(res.plannedReturnOn)}`}
              </h5>
            </div>
          </div>
          <div className="currently-reading__actions">
            <Button
              onClick={() => onEditReservationClick(res)}
              secondaryAction
              small
              wide
            >
              Edit
            </Button>
            <Button onClick={() => onCheckInClick(res)} small wide>
              Check In
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CurrentlyReadingSection;
