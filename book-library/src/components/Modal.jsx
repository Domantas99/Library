/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable react/button-has-type */
import React, {useState} from "react";
import * as ModalReact from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { setWishlistModal } from "../store/wishlist/actions";

export default function Modala({ children }) {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.wishlist.modalState);
  console.log(modalState, 'cia state');

  const onExitClick = () => {
    dispatch(setWishlistModal(false));
  };

  return (
    <ModalReact
      isOpen={modalState}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.55)",
        },
        content: {
          width: "56%",
          height: "80%",
          margin: "auto",
          backgroundColor: "white",
        },
      }}
    >
      <div className="modal-exit" onClick={() => onExitClick()}>
        X
      </div>
      {children}
    </ModalReact>
  );
}
