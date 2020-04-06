import React from 'react'

export default function SearchBarResultBlock({book}) {
    return (
        <div className="_search-block">
            <div className="_search-block__image-container">
                <img className="_search-block__image-container-image"
                    // src={book.coverPictureUrl} 
                    src="https://dummyimage.com/100x135.jpg/dddddd/000000" 
                    alt="https://dummyimage.com/100x135.jpg/dddddd/000000"/>
            </div>
            <div className="_search-block__text">
                <h1 className="_search-block__text-title">{book.title}</h1>
                <h3 className="_search-block__text-isbn">{book.isbn}</h3>
                <h2 className="_search-block__text-other">{book.author}</h2>
                <h2 className="_search-block__text-other">Stars</h2>
                <h2 className="_search-block__text-other">Available</h2>
            </div>
        </div>
    )
}
