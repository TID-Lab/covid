// The reducer for the COVID-19 topics radio buttons
import { PayloadAction } from '@reduxjs/toolkit';
import { COVID_TOPICS_TYPE, COVID_TOPICS } from 'util/filterData';
const initState: COVID_TOPICS_TYPE = 'all';

export default function topicReducer(
  state = initState,
  action: PayloadAction<COVID_TOPICS_TYPE>
) {
  switch (action.type) {
    case 'topic/set':
      return action.payload;
    default:
      return state;
  }
}
