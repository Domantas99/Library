/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookAvailability } from "../store/library/actions";
import Modal from "./Modal";
import ReservationModalContent from "./ReservationModalContent";
import { addReservation } from "../store/reservations/actions";
import CantFind from "./CantFind";

export default function BookAvailabilitySection({ book }) {
  const dispatch = useDispatch();
  const bookInOffices = useSelector((state) => state.library.bookAvailability);
  const [ modalState, setModalState ] = useState(false);
  const [ cantFindModal, setCantFindModalState ] = useState(false);
  const [ activeOffice, setActiveOffice ] = useState(null);
  const [ reservation, setReservation ] = useState(null);

  const handleModalClick = (e) => {
    setReservation(generateReservation(book, activeOffice, 1));
    setModalState(true);
  }

  const handleOfficeClick = (e, data) => {
    setActiveOffice(data);
  }

  const handleSubmit = (e) => {
    dispatch(addReservation({...reservation}));
    setModalState(false);
  }


  const generateReservation = (book, office, returnDate, user) => {
    let date = new Date();
    const obj = {book, activeOffice};
    return obj;
    // let dateString = `${date.getFullYear()}-${date.getMonth() < 9 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1)}-${date.getDay() < 9 ? ("0" + (date.getDay())) : (date.getDay())}`;
    // return JSON.parse(JSON.stringify({
    //     bookId: book.id,
    //     title: book.title,
    //     author: book.author,
    //     coverPictureUrl: book.coverPictureUrl,
    //     releaseDate: book.releaseDate,
    //     dateAdded: book.dateAdded,
    //     description: book.description,
    //     category: book.category,
    //     tag: book.tag,
    //     format: book.format,
    //     numberOfPages: book.numberOfPages,
    //     series: book.series,
    //     publisher: book.publisher,
    //     editionLanguage: book.editionLanguage,
    //     goodReadsUrl: book.goodReadsUrl,
    //     office: office.name,
    //     status: "Borrowed",
    //     bookedFrom: dateString,
    //     userId: user
    // }));
  }

  const generateOfficeElement = (d) => {
    if (d.count > 0) {
      return (
      <div className="ba-section-list-item" key={d.office.name}>
        <input type="radio" name="office" className="no_forced_size" onClick={(e)=> handleOfficeClick(e, {...d.office, count: d.count})}/>
        <div className="ba-section-office-details">
          <div className="ba-section-list-item-text-title">{d.office.name} office</div>
          <div className="ba-section-list-item-text-available">{d.count} available</div>
          <div className="ba-section-list-item-text-address">{d.office.fullAddress}</div>
          <div className="ba-section-list-item-text-other" onClick={() => setCantFindModalState(true)} >Can't find a copy?</div>
        </div>
      </div>);
    } else {
    return (
      <div className="ba-section-list-item" key={d.office.name}>
        <div className="ba-section-list-item-text-title">{d.office.name} office</div>
        <div className="ba-section-list-item-text-unavailable">Currently unavailable</div>
        <div className="ba-section-list-item-text-address">{d.office.fullAddress}</div>
        </div>
      )
    }
  }

  useEffect(() => {
    dispatch(getBookAvailability(book.id));
  }, [dispatch, book.id]);

  return (
    <div className="ba-section">
      {bookInOffices.length > 0 ? (
        <>
          <div className="ba-section-list">
            <Modal
              modalState={cantFindModal}
              exitAction={() => setCantFindModalState(false)}
              height="250px"
              width="500px"
            >
              <CantFind onExit={() => setCantFindModalState(false)} />
            </Modal>
            {bookInOffices.map((d) => generateOfficeElement(d))}
            <Modal
              modalState={modalState}
              exitAction={() => setModalState(false)}
              height="auto"
              width="400px"
            >
              { activeOffice && <ReservationModalContent reservation={reservation} modalHandler={setModalState} submitHandler={handleSubmit}/> }
            </Modal>
          </div>
          <div className="ba-section-buttons">
            <div>
            <button className="ba-section-buttons-dark" onClick={handleModalClick} disabled={!activeOffice}>Check Out</button>
            </div>
          </div>
        </>
      ): <div>Book is not added</div>
      }
    </div>
  );
}
