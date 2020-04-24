/* eslint-disable react/button-has-type */
import React from "react";
import * as ModalReact from "react-modal";

export default function Modala({ children, state }) {
  return (
    <ModalReact
      isOpen={state}
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
      <div className="modal-exit">X</div>
      {children}
    </ModalReact>
  );
}
