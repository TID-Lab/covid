// @ts-nocheck
// Represents a categorization of a report by an SMTC monitor

const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  // Unique, do we still need to pre-check name?
  name: { type: String, required: true, unique: true },
  color: String,
  description: String,
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
  posts: { type: [mongoose.Schema.Types.ObjectId], ref: 'PostId' },
});

// tagSchema.pre('save', function(next) {
//     var tag = this;
//     if(!tag.name) return next(new Error.Validation("name_required"));
//         // Check for uniqueness
//     SMTCTag.checkNewUnique(tag, function(unique, err) {
//         if (!unique) return next(new Error.Validation(err));
//         else next();
//     });
// });

const CustomTag = mongoose.model('CustomTag', tagSchema);

// SMTCTag.checkNewUnique = function(tag, callback) {
//     var query = { $and: [
//         { _id: { $ne: tag._id } },
//         { name: tag.name }
//     ]};
//     SMTCTag.countDocuments(query, function(err, count) {
//       if (err) {
//         console.log(err);
//       }
//         if (count) callback(false, tag.name + '_not_unique');
//         else callback(true);
//     })
// }

module.exports = CustomTag;
