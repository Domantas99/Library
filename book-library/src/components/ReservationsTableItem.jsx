/* eslint-disable react/prop-types */
import React, {useState} from "react";
import Modal from "./Modal";
import ReservationModalContent from "./ReservationModalContent";
import { updateReservation } from "../store/reservations/actions";
import { useDispatch } from "react-redux";

export default ({ data }) => {
    
    const dispatch = useDispatch();
    const [ modalState, setModalState ] = useState(false);
    const [ returnDate, setReturnDate ] = useState(data.returnDate);

    const handleModalClick = (e) => {
        setModalState(true);
    }

    const handleSubmit = (e) => {
        dispatch(updateReservation({...data, returnDate: returnDate}));
        setModalState(false);
    }

    return (
        <tr key={data.id}>
            <td>
                <img src={data.coverPictureUrl} alt=""/>
                <span>{data.title}</span>
                <span>{data.author}</span>
            </td>
            <td>
                <span>{data.office}</span>
            </td>
            <td>
                {
                data.status === "Borrowed" ?
                    (
                        <span>Borrowed</span>
                    ) : (
                        <span>Requested</span>
                    )
                }
            </td>
            <td>{data.bookedFrom}</td>
            <td>{data.returnDate}</td>
            {
                data.status === "Borrowed" ?
                (
                    <td>
                        <Modal
                            modalState={modalState}
                            exitAction={() => setModalState(false)}
                            height="auto"
                        width="400px"
                        >
                        <ReservationModalContent reservation={data} returnDate={returnDate} returnDateHandler={setReturnDate} modalHandler={setModalState} submitHandler={handleSubmit}/>
                    </Modal>
                    <button onClick={handleModalClick}>Edit</button>
                    <button>Check In</button>
                </td>
                ) : (
                    <td><button>Leave waitlist</button></td>
                )
            }
        </tr>
    )
};
