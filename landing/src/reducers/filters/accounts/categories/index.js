// The reducer for the account category radio buttons

const initState = 'all';

export default function categoriesReducer(state = initState, action) {
  switch (action.type) {
        case 'accounts/categories/set':
            return action.payload
      default:
          return state
  }
}