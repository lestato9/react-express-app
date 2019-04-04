const initialState = [];

export const shoppingListItems = (state = initialState, { type, payload }) => {
  switch (type) {

    case 'STORE_SHOPPING_LIST_ITEMS':
      return payload;

    default:
      return state;
  }
}
