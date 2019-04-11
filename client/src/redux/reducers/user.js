const initialState = {
  isAuthorized: false,
  name: ''
}

export const user = (state = initialState, { type, payload }) => {
  switch (type) {

    case 'STORE_USER_DATA':
      return { ...state, ...payload }

    case 'STORE_USER_FIELD':
      return { ...state, [payload.field]: payload.value }

    default:
      return state
  }
}
