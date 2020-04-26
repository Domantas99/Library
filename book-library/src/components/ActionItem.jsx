/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";

export default function ActionItem({ linkTitle, onClickAction }) {
  const handleBookOperationClick = () => {
    onClickAction();
  };

  return (
    <div onClick={() => handleBookOperationClick()} className="book">
      <div className="book__add">
        <span className="book__add_plus">+</span>
        <span className="book__add_text">{linkTitle}</span>
      </div>
    </div>
  );
}
