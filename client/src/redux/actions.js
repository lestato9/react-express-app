export const a_storeUserData = (data) => ({
  type: 'STORE_USER_DATA',
  payload: data
});

export const a_storeUserField = (field, value) => ({
  type: 'STORE_USER_FIELD',
  payload: {
    field,
    value
  }
})

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

