import { routeTypes } from './routeTypes';
import { Dashboard } from 'routes/Dashboard/Dashboard';
import { Login } from 'routes/Login/Login';
import { Signup } from 'routes/Signup/Signup';

export const routes = {
  dashboard: {
    type: routeTypes.PRIVATE,
    path: '/dashboard',
    component: Dashboard
  },
  login: {
    type: routeTypes.PUBLIC,
    path: '/login',
    component: Login
  },
  signup: {
    type: routeTypes.PUBLIC,
    path: '/signup',
    component: Signup
  }
}
