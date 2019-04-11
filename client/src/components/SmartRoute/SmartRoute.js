import React from 'react';
import { Redirect } from 'react-router-dom';
import { routes, routeTypes } from 'config';


export const SmartRoute = ({ type, path, component: Component, redirectTo, isAuthorized }) => {
  const redirectToLink = redirectTo || routes.login.path;

  if (
    (type === routeTypes.PUBLIC) ||
    (type === routeTypes.PRIVATE && isAuthorized) ||
    !type
  ) {
    return <Component />;
  } else {
    if (redirectToLink === path) {
      throw new Error('Route path and link to redirect couldn\'t be the same!');
    }

    return <Redirect to={redirectTo || routes.login.path} />
  }
}

