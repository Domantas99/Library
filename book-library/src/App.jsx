import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Dashboard,
  EditBook,
  Library,
  RegisterBook,
  TeamReservations,
  UserReservations,
  UserSettings,
  Wishlist,
} from './features';
import { SearchBar, Navigation } from './components';
import { getUser } from './store/user/actions';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
function App() {
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.user.loggedInUserId);
  const myToast = useSelector((state) => state.general.toast);

  const notify = () => {
    toast[myToast.type](myToast.message, {
      position: toast.POSITION[myToast.position],
      autoClose: myToast.duration,
    });
  };

  useEffect(() => {
    if (myToast.message !== '') {
      notify();
    }
  }, [myToast]);

  useEffect(() => {
    dispatch(getUser(loggedInUserId));
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [loggedInUserId]);

  return (
    <>
      <div className="header">
        <SearchBar />
      </div>
      <Navigation />
      <div className="page">
        <div className="page__content">
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/library/register-book" component={RegisterBook} />
            <Route path="/library/:id?" component={Library} />
            <Route path="/wishlist" component={Wishlist} />
            <Route path="/reservations/team" component={TeamReservations} />
            <Route path="/reservations" component={UserReservations} />
            <Route path="/edit-book/:id?" component={EditBook} />
            <Route path="/user-settings" component={UserSettings} />
            <Redirect exact from="/" to="/library" />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default App;
