import { combineReducers } from "redux";
import { shoppingItems, user } from './reducers';

export const reducer = combineReducers({
  shoppingItems,
  user
});

