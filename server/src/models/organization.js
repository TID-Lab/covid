const mongoose = require('mongoose');

/**
 * The Mongoose Schema for a partner organization using the dashboard.
 */
const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  hash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'org'],
    default: 'org',
  },
}, { versionKey: false });

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
