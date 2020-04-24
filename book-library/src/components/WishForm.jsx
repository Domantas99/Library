/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

export default function WishForm() {
  const handleChange = (event) => {};

  return (
    <div>
      <div>Add a new book request</div>
      <div className="input-wrapper">
        <label htmlFor="bookTitle">TITLE</label>
        <br />
        <input
          type="text"
          name="bookTitle"
          onChange={(e) => handleChange(e)}
        />
      </div>
    </div>
  );
}
