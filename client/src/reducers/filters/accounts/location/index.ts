// The reducer for the account location toggle (Georgia vs. non-Georgia)
import { PayloadAction } from '@reduxjs/toolkit';

const initState = 'all';

export default function location(
  state = initState,
  action: PayloadAction<string>
) {
  const { payload } = action;
  switch (action.type) {
    case 'accounts/location/set':
      return payload;
    default:
      return state;
  }
}
