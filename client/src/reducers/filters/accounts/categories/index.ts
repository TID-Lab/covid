// The reducer for the account category radio buttons
import { PayloadAction } from '@reduxjs/toolkit';
const initState = 'all';

export default function categoriesReducer(
  state = initState,
  action: PayloadAction<string>
) {
  switch (action.type) {
    case 'accounts/categories/set':
      return action.payload;
    default:
      return state;
  }
}
