import React from 'react'

export default function SearchResultBlock({book}) {
    return (
        <div>
            <h3>{book.id}</h3>
            <h3>{book.title}</h3>
        </div>
    )
}
