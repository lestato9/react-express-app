import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { SmartRoute } from 'components/SmartRoute/SmartRoute';
import { NotFound } from 'routes/NotFound/NotFound';
import { routes } from 'config';

import styles from './App.module.css';

const isUserAuthorized = true;

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Switch>
          {
            Object.entries(routes).map(
              ([key, value]) => <SmartRoute key={key} {...value} isUserAuthorized={isUserAuthorized} />
            )
          }
          <Route component={NotFound}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
