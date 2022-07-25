// The reducer for the social media posts that are on the dashboard right now.
import { PayloadAction } from '@reduxjs/toolkit';

const initState: any[] = [];

export default function postsReducer(
  state = initState,
  action: PayloadAction<any>
) {
  switch (action.type) {
    case 'posts/set':
      return [...action.payload];
    default:
      return state;
  }
}
