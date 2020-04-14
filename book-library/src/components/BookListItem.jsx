import React from "react";

export default ({data}) => (
    <a className="book" id={`book-${data['Id']}`} href={`/library/${data['Id']}`}>
        <div className="book__image">
            <img src={data['CoverPictureUrl']} alt=""/>
        </div>
        <span className="book__title">{data["Title"]}</span>
        <span className="book__author">{data["Author"]}</span>
    </a>
)