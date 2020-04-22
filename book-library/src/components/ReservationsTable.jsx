import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getReservations } from "../store/reservations/actions";

const createTableRows = (reservations) => {
    return reservations.map(reservation => (
        <tr key={reservation.Id}>
            <td>
                <img src={reservation.CoverPictureUrl} alt=""/>
                <span>{reservation.Title}</span>
                <span>{reservation.Author}</span>
            </td>
            <td>
                <span>{reservation.Office}</span>
            </td>
            <td>
                {
                    reservation.Status === "Borrowed" ? //We'll need to tag these with different classes anyway when we're applying styles.
                        (
                            <span>Borrowed</span>
                        ) : (
                            <span>Requested</span>
                        )
                }
            </td>
            <td>{reservation.BookedFrom}</td>
            <td>{reservation.ReturnDate}</td>
            {
                reservation.Status === "Borrowed" ?
                (
                    <td><button>Edit</button><button>Check In</button></td>
                ) : (
                    <td><button>Leave waitlist</button></td>
                )
            }
            
        </tr>
    ));
}

const ReservationsTable = () => {
    const dispatch = useDispatch();
    
    const reservations = useSelector(state => state.reservations.reservationData)
    const [tableRows, setTableRows] = useState([]);

    useEffect(() => {
        dispatch(getReservations());
    }, [dispatch]);

    useEffect(() => {
        setTableRows(
            createTableRows(reservations)
        );
    }, [reservations]);

    return (
        <table>
            <thead>
                <tr>
                    <th>Book</th>
                    <th>Office</th>
                    <th>Status</th>
                    <th>Booked from</th>
                    <th>Return Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>{tableRows}</tbody>
        </table>
    );
}

export default ReservationsTable