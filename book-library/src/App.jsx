/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Dashboard,
  EditBook,
  Library,
  RegisterBook,
  Reservations,
  UserSettings,
  Wishlist,
} from './features';
import { SearchBar, Navigation, Spinner } from './components';
import { getUser, isAuth } from './store/user/actions';
import 'react-toastify/dist/ReactToastify.css';
import Registration from './features/registration/registration';
import Login from './features/login/login';
import { getOffices } from './store/office/actions';

toast.configure();
function App() {
  const dispatch = useDispatch();
  const myToast = useSelector((state) => state.general.toast);
  const spinnerCount = useSelector((state) => state.general.spinnerCount);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const isAuthLoading = useSelector((state) => state.user.authLoading);

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
    dispatch(isAuth());
  }, []);

  useEffect(() => {
    dispatch(getOffices());
    if (isAuthenticated) {
      dispatch(getUser());
    }
  }, [isAuthenticated]);

  if (isAuthLoading) {
    return null;
  }

  return (
    <>
      {spinnerCount !== 0 && <Spinner />}
      {isAuthenticated ? (
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
                <Route path="/reservations" component={Reservations} />
                <Route path="/edit-book/:id?" component={EditBook} />
                <Route path="/user-settings" component={UserSettings} />
                <Redirect exact from="/*" to="/dashboard" />
              </Switch>
            </div>
          </div>
        </>
      ) : (
        <div>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/registration" component={Registration} />
            <Redirect exact from="/" to="/login" />
          </Switch>
        </div>
      )}
    </>
  );
}

export default App;
