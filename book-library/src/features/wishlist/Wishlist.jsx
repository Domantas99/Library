/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BookList } from "../../components";
import { getWishlist, setWishlistModal } from "../../store/wishlist/actions";
import ActionItem from "../../components/ActionItem";
import Modal from "../../components/Modal";
import WishForm from "../../components/WishForm";

export default () => {
  const [modalState, setModalState] = useState(false);

  return (
    <div className="panel">
      <Modal
        modalState={modalState}
        exitAction={() => setModalState(false)}
        height="80%"
        width="56%"
      >
        <WishForm exitAction={() => setModalState(false)} />
      </Modal>
      <div className="panel__header">
        <h1>Wishlist</h1>
      </div>
      <BookList
        dataSelector={useSelector((state) => state.wishlist.bookData)}
        dataAction={getWishlist}
        addLink="/add-wishlist"
        actionButton={
          <ActionItem
            linkTitle="Add new book request"
            onClickAction={() => setModalState(true)}
          />
        }
      />
    </div>
  );
};
