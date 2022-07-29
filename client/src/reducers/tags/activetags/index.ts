// @ts-nocheck
// The reducer for the all active tags

const initState = [];

export default function activetagsReducer(state = initState, action) {
  switch (action.type) {
    case 'tags/set':
      return [...action.payload];
    default:
      return state;
  }
}
