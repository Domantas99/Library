import React, {useState} from "react";
import { useDispatch } from 'react-redux';
import BookListItem from "./BookListItem";
import { useEffect } from "react";

const getBookSorter = (sort_field, sort_direction) => {
    return (a, b) => {
        return (a[sort_field] > b[sort_field] ? 1 : a[sort_field] < b[sort_field] ? -1: 0) * sort_direction;
    }
}

const createBookComponents = (data, sort_field, sort_direction) => {
    return [...data].sort(getBookSorter(sort_field, sort_direction)).map((element, index) => {
        return (<BookListItem key={element["Id"]} data={element}/>)}
    );
}

function BookList({dataSelector, dataAction, addLink=""}){
    const dispatch = useDispatch();
    const [sortField, setSortField] = useState('DateAdded');
    const [sortDirection, setSortDirection] = useState(-1);
    const [bookComponents, setBookComponents] = useState([]);

    const handleChangeSortField = (event) => {
        setSortField(event.target.value);
    }

    const handleChangeSortDirection = (event) => {
        setSortDirection(event.target.value);
    }

    useEffect(() => {
        dispatch(dataAction())
    }, [dispatch, dataAction]);

    useEffect(()=> {
        setBookComponents(createBookComponents(dataSelector, sortField, sortDirection));
    }, [dataSelector, sortDirection, sortField]);

    return (
        <div className="panel__content">
            <select id="book-list-sorting-field" defaultValue={sortField} onChange={handleChangeSortField}>
                <option value="Title">Title</option>
                <option value="ReleaseDate">Release Date</option>
                <option value="DateAdded">Date Added</option>
            </select>
            <select id="book-list-sorting-direction" defaultValue={`${sortDirection}`} onChange={handleChangeSortDirection}>
                <option value="1">Ascending</option>
                <option value="-1">Descending</option>
            </select>
            <div className="book-grid">
                {addLink && <a className="book" id="register-new" href={`/register-book`}>
                    <div className="book__add">
                        <span className="book__add_plus">+</span>
                        <span className="book__add_text">Register new book</span>
                    </div>
                </a>}
                {bookComponents} 
            </div>
        </div>
    );
}

export default BookList;