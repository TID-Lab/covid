// The reducer for the image to be posted in popup menu on the screen right now.
import type { PayloadAction } from '@reduxjs/toolkit';

const initState = false;

export default function postingImageReducer(
  state = initState,
  action: PayloadAction<boolean>
): boolean {
  switch (action.type) {
    case 'postingImage/set':
      return action.payload;
    default:
      return state;
  }
}
