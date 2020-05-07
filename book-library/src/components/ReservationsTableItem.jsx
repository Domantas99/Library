/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import ReservationModalContent from "./ReservationModalContent";
import { removeReservation } from "../store/reservations/actions";
import CheckInForm from "./CheckInForm";

export default ({ data }) => {
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState(false);
  const [checkInModalState, setCheckInModalState] = useState(false);
  const handleModalClick = () => {
    setModalState(true);
  };

  const onConfirmClick = () => {
    dispatch(removeReservation(data.id));
    setCheckInModalState(false);
  }

  return (
    <tr key={data.id}>
      <Modal
        modalState={checkInModalState}
        exitAction={() => setCheckInModalState(false)}
        height="400px"
        width="400px"
      >
        <CheckInForm
          onCancel={() => setCheckInModalState(false)}
          reservation={data}
          onConfirm={() => onConfirmClick()}
        />
      </Modal>
      <td>
        <img src={data.book.coverPictureUrl} alt="" />
        <span>{data.book.title}</span>
        <span>{data.book.author}</span>
      </td>
      <td>
        <span>{data.activeOffice.name}</span>
      </td>
      <td>
        {data.status === "Borrowed" ? (
          <span>Borrowed</span>
        ) : (
          <span>Requested</span>
        )}
      </td>
      <td>{data.bookedFrom}</td>
      <td>{data.returnDate}</td>
      {data.status === "Borrowed" ? (
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
              onSubmit={() => ({})}
            />
          </Modal>
          <button onClick={() => handleModalClick()}>Edit</button>
          <button onClick={() => setCheckInModalState(true)}>Check In</button>
        </td>
      ) : (
        <td>
          <button>Leave waitlist</button>
        </td>
      )}
    </tr>
  );
};
