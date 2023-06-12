// @ts-nocheck
// Represents a categorization of a report by an SMTC monitor

const { Schema } = require('mongoose');

export const tagSchema = new Schema({
  name: { type: String, required: true },
  color: String,
  description: String,
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
  posts: { type: [Schema.Types.ObjectId], ref: 'PostId' },
});
