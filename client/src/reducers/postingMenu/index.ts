// The reducer for the popup component on the screen right now.
import { PayloadAction } from '@reduxjs/toolkit';
const initState = false;

export default function postingMenuReducer(
  state = initState,
  action: PayloadAction<boolean>
) {
  switch (action.type) {
    case 'postingMenu/set':
      return action.payload;
    default:
      return state;
  }
}
