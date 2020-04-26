/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

function BookList({ dataSelector, dataAction, addLink = "", actionButton }) {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.wishlist.modalState);
  const [sortField, setSortField] = useState("dateAdded");
  const [sortDirection, setSortDirection] = useState(-1);
  const [bookComponents, setBookComponents] = useState([]);

  const handleChangeSortField = (event) => {
    setSortField(event.target.value);
  };

  const handleChangeSortDirection = (event) => {
    setSortDirection(event.target.value);
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
      <Modal
        modalState={modalState}
        exitAction={() => dispatch(setWishlistModal(false))}
        height="80%"
        width="56%"
      >
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
        {addLink && <div>{actionButton}</div>}
        {bookComponents}
      </div>
    </div>
  );
}

export default BookList;
