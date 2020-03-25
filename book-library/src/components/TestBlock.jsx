import React from 'react';

export default ({label, data, action}) => (
  <div className="test--block">
    <button onClick={action}>Get Data</button>
    <h4>{label}</h4>
    <span><b>Library name:</b> {data && data.libraryName}</span>
    <span><b>Book count:</b> {data && data.bookCount}</span>
  </div>
);