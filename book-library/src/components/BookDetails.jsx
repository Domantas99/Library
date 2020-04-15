import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBookDetails } from "../store/library/actions";

export default ({id}) => {
    const dispatch = useDispatch();
    const bookDetails = useSelector(state => state.library.bookDetails);

    useEffect(() => {
        dispatch(getBookDetails(id));
    }, [dispatch, id]);

    return (
        <div>
            {bookDetails ?
                <div>
                    { bookDetails['CoverPictureUrl'] && <img src={bookDetails['CoverPictureUrl']} alt=""/> }
                    { bookDetails["Title"] && <h2>{bookDetails['Title']}</h2> }
                    { bookDetails["Author"] && <span>By {bookDetails["Author"] }</span> }
                    { bookDetails['Description'] && <p>{bookDetails["Description"] }</p> }
                    <hr/>
                    <h3>Details</h3>
                    <table>
                        <tbody>
                            {
                                bookDetails['Category'] &&
                                    <tr>
                                        <td>
                                            Category
                                        </td>
                                        <td>
                                            { bookDetails["Category"] }
                                        </td>
                                    </tr>
                            }
                            {
                                bookDetails['Isbn'] &&
                                    <tr>
                                        <td>
                                            ISBN
                                        </td>
                                        <td>
                                            { bookDetails["Isbn"] }
                                        </td>
                                    </tr>
                            }
                            {
                                bookDetails['GoodReadsUrl'] &&
                                    <tr>
                                        <td>
                                            GoodReads URL
                                        </td>
                                        <td>
                                            <a href={ bookDetails["GoodReadsUrl"] }>{ bookDetails["GoodReadsUrl"] }</a> }
                                        </td>
                                    </tr>
                            }
                            {
                                bookDetails['ReleaseDate'] &&
                                    <tr>
                                        <td>
                                            Release Date
                                        </td>
                                        <td>
                                            { bookDetails["ReleaseDate"] }
                                        </td>
                                    </tr>
                            }
                            {
                                bookDetails['DateAdded'] &&
                                    <tr>
                                        <td>
                                            Date Added
                                        </td>
                                        <td>
                                            { bookDetails["DateAdded"] }
                                        </td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
             : null}
        </div>
    );
}