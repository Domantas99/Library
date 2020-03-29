import React from "react";

export default ({data}) => (
    <div className="book-list-item" id={`book-list-item-${data['Id']}`}>
        <img className="book-list-item--cover" src={data['CoverPictureUrl']} alt=""></img>
        <span className="book-list-item--title">{data["Title"]}</span>
        <span className="book-list-item--author">{data["Author"]}</span>
    </div>
)