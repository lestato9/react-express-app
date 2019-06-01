import axios from 'axios';
import { endpoints } from './endpoints';
import { store } from 'index';
import { a_storeUserField } from 'redux/actions';

// configure axios
const http = axios.create();
http.interceptors.response.use((response) => response, (err) => {
  if (err.response.status === 401) {
    if (store.getState().user.isAuthorized) {
      store.dispatch(a_storeUserField('isAuthorized', false));
    }
  }

  throw err;
})

// can be used to define actual url
// in development we use package.json => proxy
const { REACT_APP_MODE } = process.env;

export const api = {
  getShoppingItems() {
    return http.get(`/${endpoints.shoppingItemsList}`);
  },
  createShoppingItem(data) {
    return http.post(`/${endpoints.createShoppingItem}`, data);
  },
  deleteShoppingItem(id) {
    return http.delete(`/${endpoints.deleteShoppingItem}/${id}`)
  },
  login(data) {
    return http.post(`/${endpoints.login}`, data);
  },
  signup(data) {
    return http.post(`/${endpoints.signup}`, data)
  }
};

