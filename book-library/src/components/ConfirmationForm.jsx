/* eslint-disable react/button-has-type */
import React from "react";

export default function ConfirmationForm({ text, onNoAction, onYesAction }) {
  return (
    <div className="confirmation-form">
      <div className="confirmation-form-text">
        <h3>{text}</h3>
      </div>
      <div className="confirmation-form-buttons">
        <button onClick={() => onNoAction()}>No</button>
        <button onClick={() => onYesAction()}>Yes</button>
      </div>
    </div>
  );
}
