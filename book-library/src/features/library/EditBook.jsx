import React, { useEffect } from 'react';
import { BookForm } from '../../components'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getBookDetails } from '../../store/library/actions';

export default () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const bookDetails = useSelector(state => state.library.bookDetails);

    useEffect(() => {
        dispatch(getBookDetails(id))
    }, [dispatch, id]);


    return (
        id ?
            <div className="content-wrapper">
                {bookDetails && <BookForm formTitle="Edit" bookDetails={bookDetails} id={id} />}
            </div>
            : <Link to="/">Return home</Link>
    )
}