import React from "react";

export default ({data}) => (
    <div className="book-list-item" id={`book-list-item-${data['id']}`}>
        <span>{data["title"]}</span>
        <span>{data["author"]}</span>
    </div>
)