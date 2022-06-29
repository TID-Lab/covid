// The reducer for the COVID-19 topics radio buttons
import { PayloadAction } from '@reduxjs/toolkit';

const initState = 'all';

export default function topicReducer(
  state = initState,
  action: PayloadAction<string>
) {
  switch (action.type) {
    case 'topic/set':
      return action.payload;
    default:
      return state;
  }
}
