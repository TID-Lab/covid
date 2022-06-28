// The reducer for the institutional/non-institutional toggle
import { PayloadAction } from '@reduxjs/toolkit';

const initState = 'all';

export default function institutions(
  state = initState,
  action: PayloadAction<string>
) {
  const { payload } = action;
  switch (action.type) {
    case 'accounts/institutions/set':
      return payload;
    default:
      return state;
  }
}
