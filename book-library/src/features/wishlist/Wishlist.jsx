import React from "react";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import { BookList } from "../../components";
import { getWishlist } from "../../store/wishlist/actions";

export default () => {
  return (
    <div className="panel">
      <div className="panel__header">
        <h1>Wishlist</h1>
      </div>
      <BookList
        dataSelector={useSelector((state) => state.wishlist.bookData)}
        dataAction={getWishlist}
        addLink="/add-wishlist"
        linkTitle="Add new book request"
      />
    </div>
  );
};
