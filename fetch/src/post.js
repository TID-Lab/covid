const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  authoredAt: { type: Date, required: true },
  fetchedAt: { type: Date, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  platform: { type: String, enum: ['facebook', 'instagram', 'twitter'] },
  platformID: { type: String, required: true },
  content: { type: String },
  raw: { type: Schema.Types.Mixed, required: true },
  from: { type: String, required: true },
  topics: { type: [String], default: [] },
  tags: { type: [String], default: [] },
  engagement: { type: Number, required: true },
});

const SocialMediaPost = model('SocialMediaPost', postSchema);

module.exports = SocialMediaPost;
