/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { removeReservation } from '../store/reservations/actions';
import Modal from './Modal';
import CheckInForm from './CheckInForm';

export default function CurrentlyReadingSection({ reservations }) {
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState(false);
  const [checkInReservation, setCheckInReservation] = useState({});
  function onCheckInClick(reservation) {
    //;
    setCheckInReservation(reservation);
    setModalState(true);
  }

  function onFormConfirm() {
    dispatch(removeReservation(checkInReservation.id, 1))
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
        <CheckInForm 
          reservation={checkInReservation.bookCase}
          onCancel={() => setModalState(false)}
          onConfirm={() => onFormConfirm()}
        />
      </Modal>
      {reservations.map((res) => (
        <li key={res.id} className="currently-reading__item">
          <div className="currently-reading__info">
            <div className="currently-reading__image">
              <img src={res.bookCase.book.coverPictureUrl} alt="" />
            </div>
            <div>
              <h4 className="currently-reading__title">{res.bookCase.book.title}</h4>
              <h5 className="currently-reading__author">{res.bookCase.book.author}</h5>
              <h5 className="currently-reading__author">Return date: {res.plannedReturnOn.slice(0, -12)}</h5>
            </div>
          </div>
          <div className="currently-reading__actions">
            <Button secondaryAction small wide>
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
}
