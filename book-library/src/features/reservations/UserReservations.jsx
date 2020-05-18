import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserReservationsTable } from '../../components';

const UserReservations = () => {
  return (
    <div className="panel">
      <div className="panel__header">
        <NavLink to="/reservations">My reservations</NavLink>
        <NavLink to="/reservations/team">Team reservations</NavLink>
      </div>
      <div className="panel__content">
        <UserReservationsTable />
      </div>
    </div>
  );
};

export default UserReservations;
