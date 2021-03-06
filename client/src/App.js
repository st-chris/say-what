import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import Game from './pages/game/Game';
import SignIn from './components/sign-in/SignIn';
import SignUp from './components/sign-up/SignUp';
import Profile from './pages/profile/Profile';
import Settings from './pages/settings/Settings';
import setAuthToken from './utils/setAuthToken';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className='container'>
            <div className='game-box'>
              <Switch>
                <Route exact path='/' component={Game} />
                <Route exact path='/signin' component={SignIn} />
                <Route exact path='/signup' component={SignUp} />
                <PrivateRoute exact path='/profile' component={Profile} />
                <PrivateRoute exact path='/settings' component={Settings} />
              </Switch>
            </div>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
