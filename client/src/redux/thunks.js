import { api } from 'services/api/api';
import { toast } from 'react-toastify';
import { a_storeShoppingItems, a_setShoppingItemsStatus, a_deleteShoppingItem } from 'redux/actions';

export const t_getShoppingItems = () => (dispatch) => {
  dispatch(a_setShoppingItemsStatus('isLoading', true));

  api.getShoppingItems()
    .then((res) => {
      dispatch(a_storeShoppingItems(res.data));
      dispatch(a_setShoppingItemsStatus('isErrored', false));
    })
    .catch((err) => {
      dispatch(a_setShoppingItemsStatus('isErrored', true));
      toast.error('Failed to fetch shopping items');
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
        toast.success('Successfully deleted shopping item');
      } else {
        throw new Error('Failed to delete shopping item');
      }
    })
    .catch(() => {
      toast.error('Failed to delete shopping item');
    })
};

export const t_createShoppingItem = (data) => (dispatch) => {
  api.createShoppingItem(data)
    .then((res) => {
      if (res.data.success) {
        dispatch(t_getShoppingItems());
        toast.success('Successfully created shopping item');
      } else {
        throw new Error('Failed to create shopping item');
      }
    })
    .catch(() => {
      toast.error('Failed to create shopping item');
    })
};
