// @ts-nocheck
// The reducer for all available tags

const initState = [];

export default function alltagsReducer(state = initState, action) {
  switch (action.type) {
    case 'tags/set':
      return [...action.payload];
    default:
      return state;
  }
}
