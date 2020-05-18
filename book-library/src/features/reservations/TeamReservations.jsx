import React from 'react';
import { NavLink } from 'react-router-dom';
import { TeamReservationsTable } from '../../components';

const TeamReservations = () => {
  return (
    <div className="panel">
      <div className="panel__header">
        <NavLink to="/reservations">My reservations</NavLink>
        <NavLink to="/reservations/team">Team reservations</NavLink>
      </div>
      <div className="panel__content">
        <TeamReservationsTable />
      </div>
    </div>
  );
};

export default TeamReservations;
