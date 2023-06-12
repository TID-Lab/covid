// The reducer for the account location toggle (Georgia vs. non-Georgia)
import { PayloadAction } from '@reduxjs/toolkit';
import { LOCATION_TYPE } from 'util/filterData';
const initState: LOCATION_TYPE = 'all';

export default function locationReducer(
  state = initState,
  action: PayloadAction<LOCATION_TYPE>
) {
  switch (action.type) {
    case 'accounts/location/set':
      return action.payload;
    default:
      return state;
  }
}
