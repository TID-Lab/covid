// The reducer for the account identity radio buttons
import { PayloadAction } from '@reduxjs/toolkit';

const initState = 'all';

export default function identitiesReducer(
  state = initState,
  action: PayloadAction<string>
) {
  switch (action.type) {
    case 'accounts/identities/set':
      return action.payload;
    default:
      return state;
  }
}
