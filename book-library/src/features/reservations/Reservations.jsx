import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import {
  UserReservationsTable,
  TeamReservationsTable,
  Panel,
} from '../../components';

const Reservations = () => {
  const isAdmin = useSelector((state) => state.user.userData?.isAdmin || false);
  const tabs = useCallback(
    () =>
      isAdmin
        ? [
            <NavLink exact to="/reservations">
              My reservations
            </NavLink>,
            <NavLink exact to="/reservations/team">
              Team reservations
            </NavLink>,
          ]
        : [
            <NavLink exact to="/reservations">
              My reservations
            </NavLink>,
            <Redirect from="/reservations/team" to="/reservations" />,
          ],
    isAdmin
  );

  return (
    <Panel title="My Reservations" tabs={tabs()}>
      <Switch>
        <Route exact path="/reservations" component={UserReservationsTable} />
        {isAdmin && (
          <Route
            exact
            path="/reservations/team"
            component={TeamReservationsTable}
          />
        )}
      </Switch>
    </Panel>
  );
};

export default Reservations;
