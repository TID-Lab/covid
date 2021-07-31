const mongoose = require('mongoose');

/**
 * The Mongoose Schema for a COVID-19 topic
 */
const topicSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  keywords: [String],
}, { versionKey: false });

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
