// The reducer for the text search bar

const initState = '';

export default function searchReducer(state = initState, action) {
  switch (action.type) {
      case 'search/set':
          return action.payload
      default:
          return state
  }
}