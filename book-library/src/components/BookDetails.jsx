/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getBookDetails, deleteBook } from '../store/library/actions';
import BookAvailabilitySection from './BookAvailabilitySection';
import BookCommentsSection from './BookCommentsSection';
import BookReservationsSection from './BookReservationsSection';
import Modal from './Modal';
import WaitlistModal from "./WaitlistModal";
import ConfirmationForm from './ConfirmationForm';
import Button from './Button';
import BookDetailsGrid from './BookDetailsGrid';

export default ({ id }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const bookDetails = useSelector((state) => state.library.bookDetails);
  const book = bookDetails.book;
  const userOffice = useSelector((state) => state.user.userData.officeId);
  const [confimationData, setConfirmationData] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [unavailableInMyOffice, setUnavailableInMyOffice] = useState(false);
  const [waitingModal, setWaitingModal] = useState(false);
  const [waiting, setWaiting] = useState({book, userOffice})
  const [activeOffice, setActiveOffice] = useState(null);
  const [moreBtnState, setMoreBtnState] = useState(false);

  const ref = React.createRef();
 
  const handleScrollClick = () =>
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
  });

  const createWaitingObj = () => {
    return {
      book: bookDetails.book,
      office: activeOffice || userOffice
    };
  };

  const openWaitingModal = () => {
    setWaiting(createWaitingObj());
    setWaitingModal(true);
  };

  const closeWaitingModal = () => {
    setWaitingModal(false);
  }

  const userId = useSelector((state) => state.user.userData.id);
  
  function onDelete() {
    setModalState(false);
    dispatch(deleteBook(bookDetails.book.id));
  }

  const archiveConfimationData = {
    text: 'Do you really want to ARCHIVE this book?',
    onNo: () => setModalState(false),
    onYes: () => {},
  };
  const DeleteConfirmationData = {
    text: 'Do you really want to DELETE this book?',
    onNo: () => setModalState(false),
    onYes: onDelete,
  };

  useEffect(() => {
    dispatch(getBookDetails(id, userId));
  }, [dispatch, id, userId]);

  function handleClick() {
    history.push(`/edit-book/${id}`);
  }

  function onArchiveClick() {
    setConfirmationData(archiveConfimationData);
    setModalState(true);
  }

  function onDeleteClick() {
    setConfirmationData(DeleteConfirmationData);
    setModalState(true);
  }

  return (
    <>
      <div onClick={() => moreBtnState && setMoreBtnState(false)} className="book-details">
        <div className="book-details__left-pannel">
          <div className="book-details__image">
            <img src={bookDetails.book?.coverPictureUrl} alt="" />
          </div>
        </div>
        <div className="book-details__content">
          <div className="book-details__title">{bookDetails.book?.title}</div>
          <h4 className="text-secondary">
            by <span className="text-underlined">{bookDetails.book?.author}</span>
          </h4>
          <div>
            <Button onClick={() => setMoreBtnState(!moreBtnState)} mini secondary><i className="btn__icon btn__icon--settings" />More</Button>
            {
              moreBtnState && (
              <div className="book-details-moreContent">
                <Button  small clear onClick={onArchiveClick}>
                  Archive book
                </Button>
                <Button small clear onClick={onDeleteClick}>
                  Delete book
                </Button>
              </div>)
            }
            
          </div>
        </div>
        <div className="book-details__content book-details__content--secondary">
          <div className="book-details__description">
            <p>{bookDetails.book?.description}</p>
          </div>
          <hr />
          {bookDetails?.book && <BookDetailsGrid bookDetails={bookDetails.book} />}
          <Button dark mini onClick={handleClick}>
            <i className="btn__icon btn__icon--edit" />
            Edit details
          </Button>
          <hr />
          <BookReservationsSection
            id={id} 
            reffer={ref} 
            unavailableInMyOffice={unavailableInMyOffice}
            openWaitingModal={openWaitingModal}
          />
          <hr />
          <BookCommentsSection id={id} />
        </div>

        <div className="book-details__side-panel reservation-panel">
          <BookAvailabilitySection
            bookDetails={bookDetails}
            handleScrollClick={handleScrollClick}
            setUnavailableInMyOffice={setUnavailableInMyOffice}
            activeOffice={activeOffice}
            setActiveOffice={setActiveOffice}
            openWaitingModal={openWaitingModal}
          />
        </div>
      </div>
      <Modal
        modalState={modalState}
        exitAction={() => setModalState(false)}
        height="120px"
        width="400px"
      >
        <ConfirmationForm
          text={confimationData.text}
          onNoAction={confimationData.onNo}
          onYesAction={confimationData.onYes}
        />
      </Modal>
      <Modal
        modalState={waitingModal}
        exitAction={() => {setWaitingModal(false)}}
        height="auto"
        width="400px"
      >
        {(
          <WaitlistModal
            waiting={waiting}
            closeModal={closeWaitingModal}
          />
        )}
      </Modal>
    </>
  );
};
