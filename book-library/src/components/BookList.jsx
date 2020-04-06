import React, {useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import BookListItem from "./BookListItem";
import { getBookList } from "../store/library/actions"
import { useEffect } from "react";

const getBookSorter = (sort_field, sort_direction) => {
    return (a, b) => {
        return (a[sort_field] > b[sort_field] ? 1 : a[sort_field] < b[sort_field] ? -1: 0) * sort_direction;
    }
}

const createBookComponents = (data, sort_field, sort_direction) => {
    return [...data].sort(getBookSorter(sort_field, sort_direction)).map((element, index) => {
        return (<BookListItem key={index} data={element}/>)}
    );
}

function BookList(){
    const dispatch = useDispatch();
    const bookData = useSelector(state => state.library.bookData);
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
            dispatch(getBookList())
        }, [dispatch]);

    useEffect(()=> {
        setBookComponents(createBookComponents(bookData, sortField, sortDirection));
    }, [bookData, sortDirection, sortField]);

    return (
        <div className="library">
            <select id="book-list-sorting-field" defaultValue={sortField} onChange={handleChangeSortField}>
                <option value="Title">Title</option>
                <option value="ReleaseDate">Release Date</option>
                <option value="DateAdded">Date Added</option>
            </select>
            <select id="book-list-sorting-direction" defaultValue={`${sortDirection}`} onChange={handleChangeSortDirection}>
                <option value="1">Ascending</option>
                <option value="-1">Descending</option>
            </select>
            <div className="book-list">
                {bookComponents} 
            </div>
        </div>
    );
}

export default BookList;