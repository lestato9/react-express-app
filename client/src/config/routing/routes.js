import { routeTypes } from './routeTypes';
import { Dashboard } from 'routes/Dashboard/Dashboard';

export const routes = {
  dashboard: {
    type: routeTypes.PUBLIC,
    path: '/',
    component: Dashboard
  }
}
