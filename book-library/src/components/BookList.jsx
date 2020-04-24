/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import BookListItem from "./BookListItem";
import { getFieldSorter } from "../utilities";
import Modal from "./Modal";
import WishForm from "./WishForm";
import { setWishlistModal } from "../store/wishlist/actions";

const createBookComponents = (data, sort_field, sort_direction) => {
  return [...data]
    .sort(getFieldSorter(sort_field, sort_direction))
    .map((element) => {
      return <BookListItem key={element.id} data={element} />;
    });
};

function BookList({ dataSelector, dataAction, addLink = "", linkTitle }) {
  const dispatch = useDispatch();
  const [sortField, setSortField] = useState("dateAdded");
  const [sortDirection, setSortDirection] = useState(-1);
  const [bookComponents, setBookComponents] = useState([]);
  const [modalState, setModalState] = useState(false);
  const history = useHistory();

  const handleChangeSortField = (event) => {
    setSortField(event.target.value);
  };

  const handleChangeSortDirection = (event) => {
    setSortDirection(event.target.value);
  };

  const handleBookOperationClick = () => {
    if (addLink === "/register-book") {
      history.push(addLink);
    } else if (addLink === "/add-wishlist") {
      dispatch(setWishlistModal(true));
    }
  };

  useEffect(() => {
    dispatch(dataAction());
  }, [dispatch, dataAction]);

  useEffect(() => {
    setBookComponents(
      createBookComponents(dataSelector, sortField, sortDirection)
    );
  }, [dataSelector, sortDirection, sortField]);

  return (
    <div className="panel__content">
      <Modal state={modalState}>
        <WishForm />
      </Modal>
      <select
        id="book-list-sorting-field"
        defaultValue={sortField}
        onChange={handleChangeSortField}
      >
        <option value="title">Title</option>
        <option value="releaseDate">Release Date</option>
        <option value="dateAdded">Date Added</option>
      </select>
      <select
        id="book-list-sorting-direction"
        defaultValue={`${sortDirection}`}
        onChange={handleChangeSortDirection}
      >
        <option value="1">Ascending</option>
        <option value="-1">Descending</option>
      </select>
      <div className="book-grid">
        {addLink && (
          <div
            onClick={() => handleBookOperationClick()}
            className="book"
            id={addLink}
          >
            <div className="book__add">
              <span className="book__add_plus">+</span>
              <span className="book__add_text">{linkTitle}</span>
            </div>
          </div>
        )}
        {bookComponents}
      </div>
    </div>
  );
}

export default BookList;
