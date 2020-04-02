import React from 'react'

export default function SearchBarResultBlock({book}) {
    return (
        <div className="search-block">
            {console.log(book, 'cia book')}
            <div>
                <img className="search-block__image"
                    // src={book.coverPictureUrl} 
                    src="https://dummyimage.com/100x135.jpg/dddddd/000000" 
                    alt="https://dummyimage.com/100x135.jpg/dddddd/000000"/>
            </div>
            <div>
                <h1 className="search-block-title">{book.title}</h1>
                <h3 className="search-block-isbn">{book.isbn}</h3>
                <h2 className="search-block-other">{book.author}</h2>
                <h2 className="search-block-other">Stars</h2>
                <h2 className="search-block-other">Available</h2>
                
            </div>
        </div>
    )
}
