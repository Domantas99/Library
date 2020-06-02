/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React from 'react';
import Button, { BUTTON_APPEARANCE } from './Button';

export default function ConfirmationForm({ text, onNoAction, onYesAction }) {
  return (
    <div className="confirmation-form">
      <div className="confirmation-form-text">
        <h3>{text}</h3>
      </div>
      <div className="confirmation-form-buttons">
        <Button buttonAppearance={BUTTON_APPEARANCE.CLEAR} onClick={onNoAction}>
          No
        </Button>
        <Button onClick={onYesAction}>Yes</Button>
      </div>
    </div>
  );
}
