export const a_setShoppingItemsStatus = (name, status) => ({
  type: 'SET_SHOPPING_ITEMS_STATUS',
  name,
  status
});

export const a_storeShoppingItems = (items) => ({
  type: 'STORE_SHOPPING_ITEMS',
  payload: items
});

