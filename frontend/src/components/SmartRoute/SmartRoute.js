import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { routeTypes } from 'config';


export const SmartRoute = ({ type, path, component, redirectTo, isUserAuthorized }) => {
  const redirectToLink = redirectTo || '/';

  if (
    (type === routeTypes.PUBLIC) ||
    (type === routeTypes.PRIVATE && isUserAuthorized) ||
    !type
  ) {
    return <Route path={path} component={component} />;
  } else {
    if (redirectToLink === path) {
      throw new Error('Route path and link to redirect couldn\'t be the same!');
    }

    return <Redirect to={redirectTo || '/'} />
  }
}

