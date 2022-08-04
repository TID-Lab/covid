// The reducer for the text search bar
import { PayloadAction } from '@reduxjs/toolkit';

const initState = '';

export default function searchReducer(
  state = initState,
  action: PayloadAction<string>
) {
  switch (action.type) {
    case 'tags/search/set':
      return action.payload;
    default:
      return state;
  }
}
