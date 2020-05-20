import React from 'react';

//TODO We should update that to show the user's name, but we'd need either a DTO or a method to fetch all users.
export default ({ data }) => {
  return (
    <div>
      <span>{data.createdBy}</span>
      <span>{data.createdOn}</span>
      <p>{data.comment}</p>
    </div>
  );
};
