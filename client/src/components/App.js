import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { SmartRoute } from 'components/SmartRoute/SmartRoute';
import { NotFound } from 'routes/NotFound/NotFound';
import { history } from 'index';
import { routes } from 'config';
import { a_storeUserField } from 'redux/actions';

import styles from './App.module.css';


const mapStateToProps = (state) => ({
  isAuthorized: state.user.isAuthorized
});

const mapDispatchToProps = {
  storeUserField: a_storeUserField
}

export const _App = (props) => {
  const { isAuthorized, storeUserField } = props;

  useEffect(() => {
    // if there is token, try it out
    if (document.cookie.includes('token')) {
      storeUserField('isAuthorized', true);

      if (
        history.location.pathname === routes.login.path ||
        history.location.pathname === routes.signup.path
      ) {

        history.push(routes.dashboard.path);
      }
    }
  }, []);

  return (
    <div className={styles.App}>
      <Switch>
        {
          Object.entries(routes).map(
            ([key, value]) => <SmartRoute key={key} {...value} isAuthorized={isAuthorized} />
          )
        }
        <Route component={NotFound}></Route>
      </Switch>
    </div>
  );
}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App);

