import React from "react";

export default ({data}) => (
    <div className="book-list-item" id={`book-list-item-${data['Id']}`}>
        <img class="book-list-item--cover" src={data['CoverPictureUrl']}></img>
        <span class="book-list-item--title">{data["Title"]}</span>
        <span class="book-list-item--author">{data["Author"]}</span>
    </div>
)