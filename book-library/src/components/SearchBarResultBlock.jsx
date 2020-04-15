import React from 'react'
import {Link} from 'react-router-dom';

export default function SearchBarResultBlock({book}) {
    return (
        <Link to={`/library/` + book.id} className="suggestions__item">
            <div className="suggestions__image">
                <img src={book.coverPictureUrl} alt=""/>
            </div>
            <div className="suggestions__text">
                <span className="suggestions__text--primary">{book.title}</span>
                <span className="suggestions__text--secondary">{book.author}</span>
            </div>
        </Link>
    )
}
