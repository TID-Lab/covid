// The reducer for the account identity radio buttons
import { PayloadAction } from '@reduxjs/toolkit';
import { IDENTITIES_TYPE } from 'util/filterData';
const initState: IDENTITIES_TYPE = 'all';

export default function identitiesReducer(
  state = initState,
  action: PayloadAction<IDENTITIES_TYPE>
) {
  switch (action.type) {
    case 'accounts/identities/set':
      return action.payload;
    default:
      return state;
  }
}
