// The reducer for the popup component on the screen right now.
import { PayloadAction } from '@reduxjs/toolkit';
import type { ReactNode } from 'react';

const initState = null;

export default function popupReducer(
  state = initState,
  action: PayloadAction<ReactNode>
) {
  switch (action.type) {
    case 'popup/set':
      return action.payload;
    default:
      return state;
  }
}
