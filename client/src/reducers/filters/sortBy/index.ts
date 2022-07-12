// The reducer for the "sort by" select dropdown
import { PayloadAction } from '@reduxjs/toolkit';

const initState = 'recent';

export default function sortByReducer(
  state = initState,
  action: PayloadAction<string>
) {
  switch (action.type) {
    case 'sortBy/set':
      return action.payload;
    default:
      return state;
  }
}
