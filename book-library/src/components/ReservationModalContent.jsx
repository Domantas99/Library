import React from "react";

export default ({reservation, returnDate, returnDateHandler, modalHandler, submitHandler}) => {
    

    const handleDateChange = (e) => {
        returnDateHandler(e.target.value);
    }

    return (
    <>
        <h2>Check out</h2>
        <div className="book-details__image">
                <img src={reservation.coverPictureUrl} alt="" />
        </div>
        <div className="book-details__title">{reservation.title}
            <h4 className="text-secondary">
                by <span className="text-underlined">{reservation.author}</span>
            </h4>
        </div>
        <h2>Reserve at:</h2>
        <div className="ba-section-office-details">
          <div className="ba-section-list-item-text-title">{reservation.name} office</div>
          <div className="ba-section-list-item-text-available">{reservation.count} available</div>
          <div className="ba-section-list-item-text-address">{reservation.fullAddress}</div>
          <label htmlFor="reservedUntil">Reserve until:</label><input type="date" name="reservedUntil" value={returnDate} onChange={handleDateChange}/>
        </div>
        <button onClick={()=>{modalHandler(false)}}>Cancel</button>
        <button onClick={submitHandler} disabled={!reservation}>{reservation.id ? "Save Changes":"Confirm Reservation"}</button>
    </>)
}