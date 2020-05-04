/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Modal from "./Modal";
import ReservationModalContent from "./ReservationModalContent";

export default ({ data }) => {
  const [modalState, setModalState] = useState(false);

  const handleModalClick = () => {
    setModalState(true);
  };

  return (
    <tr key={data.id}>
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
              modalHandler={setModalState}
            />
          </Modal>
          <button onClick={() => handleModalClick()}>Edit</button>
          <button>Check In</button>
        </td>
      ) : (
        <td>
          <button>Leave waitlist</button>
        </td>
      )}
    </tr>
  );
};
