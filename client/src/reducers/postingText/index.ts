// The reducer for the text to be posted in the popup on the screen right now.
import { PayloadAction } from '@reduxjs/toolkit';

const initState = '';

export default function postingTextReducer(
  state = initState,
  action: PayloadAction<string>
) {
  switch (action.type) {
    case 'postingText/set':
      return action.payload;
    default:
      return state;
  }
}
