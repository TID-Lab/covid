import { PayloadAction } from '@reduxjs/toolkit';

// The reducer for all available tags
interface tagSchema {
  name: string;
  color: string;
  description: string;
  organization: any;
  posts: any;
}

const initState: tagSchema[] = [];

export default function alltagsReducer(
  state = initState,
  action: PayloadAction<tagSchema[]>
) {
  switch (action.type) {
    case 'alltags/set':
      return [...action.payload];
    default:
      return state;
  }
}
