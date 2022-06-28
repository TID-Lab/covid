// The reducer for the curated vs. all-posts toggle
import { PayloadAction } from '@reduxjs/toolkit';

const initState = true;

export default function curatedOnlyReducer(
  state = initState,
  action: PayloadAction<boolean>
) {
  switch (action.type) {
    case 'accounts/curatedOnly/set':
      return action.payload;
    default:
      return state;
  }
}
