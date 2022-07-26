import { PayloadAction } from '@reduxjs/toolkit';

const initState: ResourceSchema[] = [];

// copied from server/models/resources
export interface ResourceSchema {
  authoredAt: Date;
  fetchedAt: Date;
  author: string;
  organization: string;
  name: string;
  desc: string;
  url: string;
  type: 'image' | 'website' | 'video' | 'pdf';

  topics: any[];
  platformID: string;
  content: string;
  raw: string;
  language: 'en' | 'es';
  imageurl: string;
}
export default function resourcesReducer(
  state = initState,
  action: PayloadAction<ResourceSchema[]>
) {
  switch (action.type) {
    case 'resources/set':
      return [...action.payload];
    default:
      return state;
  }
}
