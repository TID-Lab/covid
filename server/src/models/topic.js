const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  keywords: [String],
}, { versionKey: false });

/**
 * Validates whether the name of a new topic is unique
 * @param {Object} post The new post
 */
topicSchema.statics.isNameUnique = async function isNameUnique({ name }) {
  const post = await this.findOne({ name });
  return !post;
};

/**
 * Validates whether the keyword of a given topic is unique
 * @param {Object} post The new post
 */
topicSchema.statics.isKeywordUnique = async function isKeywordUnique(name, keyword) {
  const topic = await this.findOne({ name });
  return !topic.keywords.includes(keyword.toLowerCase());
};

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
