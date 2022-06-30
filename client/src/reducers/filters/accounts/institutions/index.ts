// The reducer for the institutional/non-institutional toggle
import { PayloadAction } from '@reduxjs/toolkit';
import { INSTITUTION_TYPE } from 'util/filterData';
const initState: INSTITUTION_TYPE = 'all';

export default function institutions(
  state = initState,
  action: PayloadAction<INSTITUTION_TYPE>
) {
  const { payload } = action;
  switch (action.type) {
    case 'accounts/institutions/set':
      return payload;
    default:
      return state;
  }
}
