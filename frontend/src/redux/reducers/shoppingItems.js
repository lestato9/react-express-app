const initialState = {
  list: [],
  isLoading: false,
  isErrored: false
};

export const shoppingItems = (state = initialState, action) => {
  switch (action.type) {

    case 'STORE_SHOPPING_ITEMS':
      return {
        ...state,
        list: action.payload
      };

    case 'SET_SHOPPING_ITEMS_STATUS':
      return {
        ...state,
        [action.name]: action.status
      };

    default:
      return state;
  }
}
