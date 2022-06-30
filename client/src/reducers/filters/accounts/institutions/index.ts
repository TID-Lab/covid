// The reducer for the institutional/non-institutional toggle
import { PayloadAction } from '@reduxjs/toolkit';
import { ACC_TYPE_TYPE } from 'util/filterData';
const initState: ACC_TYPE_TYPE = 'all';

export default function institutions(
  state = initState,
  action: PayloadAction<ACC_TYPE_TYPE>
) {
  const { payload } = action;
  switch (action.type) {
    case 'accounts/institutions/set':
      return payload;
    default:
      return state;
  }
}
