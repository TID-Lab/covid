// The reducer for the start & end date filters
import { PayloadAction } from '@reduxjs/toolkit';
import { DATE_PRESET_TYPE } from 'util/filterData';
import formatDate from 'util/formatDate';

const today = new Date();
const weekAgo = new Date();
weekAgo.setDate(today.getDate() - 7);
const longAgo = new Date();
longAgo.setFullYear(today.getFullYear() - 20);

interface dateRange {
  preset: DATE_PRESET_TYPE;
  to: string;
  from: string;
}

const initState: dateRange = {
  preset: '7days',
  to: formatDate(today),
  from: formatDate(weekAgo),
};
const resourceInitState: dateRange = {
  preset: 'all',
  to: formatDate(today),
  from: formatDate(longAgo),
};

export default function datesReducer(
  state = { ...initState },
  action: PayloadAction<dateRange>
) {
  switch (action.type) {
    case 'dates/reset':
      return initState;
    case 'dates/resetresource': // temporary way to have different resets for rsource vs monitoring
      return resourceInitState;
    case 'dates/set':
      return action.payload;

    default:
      return state;
  }
}
