/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable react/button-has-type */
import React from 'react';
import * as ModalReact from 'react-modal';

export default function Modal({
  modalState,
  children,
  exitAction,
  height,
  width,
}) {
  return (
    <ModalReact
      isOpen={modalState}
      style={{
        overlay: {
          backgroundColor: 'rgba(255, 255, 255, 0.55)',
        },
        content: {
          width,
          height,
          margin: 'auto',
          backgroundColor: 'white',
        },
      }}
      ariaHideApp={false}
      onRequestClose={exitAction}
      shouldCloseOnOverlayClick
    >
      <div className="modal-exit" onClick={exitAction}>
        X
      </div>
      {children}
    </ModalReact>
  );
}
