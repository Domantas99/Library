/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BookList } from "../../components";
import { getWishlist, setWishlistModal } from "../../store/wishlist/actions";
import ActionItem from "../../components/ActionItem";

export default () => {
  const dispatch = useDispatch();
  return (
    <div className="panel">
      <div className="panel__header">
        <h1>Wishlist</h1>
      </div>
      <BookList
        dataSelector={useSelector((state) => state.wishlist.bookData)}
        dataAction={getWishlist}
        addLink="/add-wishlist"
        item={
          <ActionItem
            linkTitle="Add new book request"
            onClickAction={() => dispatch(setWishlistModal(true))}
          />
        }
      />
    </div>
  );
};
