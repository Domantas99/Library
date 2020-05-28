import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import {
  UserReservationsTable,
  TeamReservationsTable,
  Panel,
} from '../../components';

const Reservations = () => {
  const tabs = [
    <NavLink exact to="/reservations">
      My reservations
    </NavLink>,
    <NavLink exact to="/reservations/team">
      Team reservations
    </NavLink>,
  ];

  return (
    <Panel title="My Reservations" tabs={tabs}>
      <Switch>
        <Route exact path="/reservations" component={UserReservationsTable} />
        <Route
          exact
          path="/reservations/team"
          component={TeamReservationsTable}
        />
      </Switch>
    </Panel>
  );
};

export default Reservations;
