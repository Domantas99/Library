/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable react/button-has-type */
import React from "react";
import * as ModalReact from "react-modal";
import { useDispatch, useSelector } from "react-redux";

export default function Modal({
  modalState,
  children,
  exitAction,
  height,
  width,
}) {
  const dispatch = useDispatch();
  //const modalState = useSelector((state) => state.wishlist.modalState);

  const onExitClick = () => {
    //dispatch(exitAction);
    exitAction()
  };

  return (
    <ModalReact
      isOpen={modalState}
      style={{
        overlay: {
          backgroundColor: "rgba(255, 255, 255, 0.55)",
        },
        content: {
          width,
          height,
          margin: "auto",
          backgroundColor: "white",
        },
      }}
      ariaHideApp={false}
    >
      <div className="modal-exit" onClick={() => onExitClick()}>
        X
      </div>
      {children}
    </ModalReact>
  );
}
