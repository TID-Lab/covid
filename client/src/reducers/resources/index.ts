// @ts-nocheck
const initState = [];

export default function resourcesReducer(state = initState, action) {
  switch (action.type) {
    case 'resources/set':
      return [...action.payload];
    default:
      return state;
  }
}
