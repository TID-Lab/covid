const { Schema, model } = require('mongoose');
/**
 * The moongose schema for a resource.
 */

const resourceSchema = new Schema({
  authoredAt: { type: Date, required: true },
  fetchedAt: { type: Date, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  platformID: { type: String, required: true },
  content: { type: String },
  imageurl : {type: String }
})

resourceSchema.index({content: "text", author: "text"});


const resourcePost = model('resource', resourceSchema);

module.exports = resourcePost;
