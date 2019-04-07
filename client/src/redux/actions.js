import { api } from 'services/api/api';

export const t_getShoppingItems = () => (dispatch) => {
  dispatch(a_setShoppingItemsStatus('isLoading', true));

  api.getShoppingItems()
    .then((res) => {
      dispatch(a_storeShoppingItems(res.data));
      dispatch(a_setShoppingItemsStatus('isErrored', false));
    })
    .catch((err) => {
      dispatch(a_setShoppingItemsStatus('isErrored', true));
      throw new Error(err);
    })
    .finally(() => {
      dispatch(a_setShoppingItemsStatus('isLoading', false));
    });
};

export const t_deleteShoppingItem = (id) => (dispatch) => {
  api.deleteShoppingItem(id)
    .then((res) => {
      if (res.data.success) {
        dispatch(a_deleteShoppingItem(id));
      } else {
        throw new Error('Server failed to delete shopping item');
      }
    })
    .catch((err) => {
      throw new Error('Cannot delete shopping item');
    })
};

export const t_createShoppingItem = (data) => (dispatch) => {
  api.createShoppingItem(data)
    .then((res) => {
      if (res.data.success) {
        dispatch(t_getShoppingItems());
      } else {
        throw new Error('Server failed to create shopping item');
      }
    })
    .catch((err) => {
      throw new Error('Cannot create shopping item');
    })
};

export const a_setShoppingItemsStatus = (name, status) => ({
  type: 'SET_SHOPPING_ITEMS_STATUS',
  name,
  status
});

export const a_storeShoppingItems = (items) => ({
  type: 'STORE_SHOPPING_ITEMS',
  payload: items
});

export const a_deleteShoppingItem = (id) => ({
  type: 'DELETE_SHOPPING_ITEM',
  id
});

