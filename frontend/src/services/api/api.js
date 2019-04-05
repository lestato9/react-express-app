import axios from 'axios';
import { endpoints } from './endpoints';

// can be used to define actual url
// in development we use package.json => proxy
const { REACT_APP_MODE } = process.env;

export const api = {
  getShoppingItems() {
    return axios.get(`/${endpoints.shoppingItemsList}`);
  }
};

