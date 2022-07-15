// The reducer for the account category radio buttons
import { PayloadAction } from '@reduxjs/toolkit';
import { ACC_CATEGORIES_TYPE } from 'util/filterData';
const initState: ACC_CATEGORIES_TYPE = 'all';

export default function categoriesReducer(
  state = initState,
  action: PayloadAction<ACC_CATEGORIES_TYPE>
) {
  switch (action.type) {
    case 'accounts/categories/set':
      return action.payload;
    default:
      return state;
  }
}
