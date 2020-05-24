/* eslint-disable react/button-has-type */
import React from 'react';

export default function CantFind({ onExit }) {
  return (
    <div className="cantFind">
      <div>
        <h1>Can't find a copy?</h1>
      </div>
      <div className="cantFind-text">
        <p>
          This will notify admin that you cannot find a physical copy of a book,
          even though it is marked as available in the system.
        </p>
        <p>
          Your library admin will get in touch with you once the problem is
          solved.
        </p>
        <div className="cantFind-buttons">
          <button onClick={() => onExit()}>Cancel</button>
          <button className="cantFind-buttons-submit">Notify admin</button>
        </div>
      </div>
    </div>
  );
}
