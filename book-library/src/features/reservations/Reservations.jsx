import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Route, Switch } from 'react-router-dom';
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
            <NavLink key="user" exact to="/reservations?status=Borrowed&status=Waiting">
              My reservations
            </NavLink>,
            <NavLink key="team" exact to="/reservations/team?status=Borrowed&status=Waiting">
              Team reservations
            </NavLink>,
          ]
        : [
            <NavLink key="user" exact to="/reservations?status=Borrowed&status=Waiting">
              My reservations
            </NavLink>,
          ],
    [isAdmin]
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
