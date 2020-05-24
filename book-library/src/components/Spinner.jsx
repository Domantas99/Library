import React from 'react'

const Spinner = () => (
    <div className="spinner">
        <div className="spinner__bookshelf_wrapper">
            <ul className="spinner__books_list">
                <li className="spinner__book_item first"></li>
                <li className="spinner__book_item second"></li>
                <li className="spinner__book_item third"></li>
                <li className="spinner__book_item fourth"></li>
                <li className="spinner__book_item fifth"></li>
                <li className="spinner__book_item sixth"></li>
            </ul>
            <div className="spinner__shelf"></div>
        </div>
    </div>
)

export default Spinner