import React from "react";

export default ({data}) => {
    return (
        <div>
            <span>{data.createdBy}</span>
            <span>{data.createdOn}</span>
            <p>{data.comment}</p>
        </div>
    );
}