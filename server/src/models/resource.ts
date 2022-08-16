// @ts-nocheck

const mongoose = require('mongoose');
import { tagSchema } from './customtag'
/**
 * The moongose schema for a resource.
 */

const resourceSchema = new mongoose.Schema({
  authoredAt: { type: Date, required: true },
  fetchedAt: { type: Date, required: true },
  author: { type: String, required: true },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  name: { type: String, required: true },
  desc: {type: String },
  url: { type: String, unique: true },
  type: {
    type: String,
    enum: ['image', 'website', 'video', 'pdf'],
    required: true,
  },
  topics: { type: [], required: true },
  platformID: { type: String },
  content: { type: String },
  raw: {type: String},
  language: {
    type: String,
    enum: ['en', 'es']
  },
  imageurl: { type: String },
  customTags: { type: [tagSchema], default: [] },
});

resourceSchema.index({ content: 'text', author: 'text' });

const resourcePost = mongoose.model('resource', resourceSchema);

module.exports = resourcePost;
