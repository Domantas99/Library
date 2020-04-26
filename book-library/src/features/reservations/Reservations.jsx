import React from "react";
import { ReservationsTable } from "../../components"; 

export default () => {
    return (
        <div className="panel">
            <div className="panel__header">
                <h1>My reservations</h1>
            </div>
            <ReservationsTable/>
        </div>
    )
}