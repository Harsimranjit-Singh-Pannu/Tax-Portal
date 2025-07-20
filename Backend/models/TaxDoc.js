const mongoose = require('mongoose');

const taxDocSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: { type: String, required: true },
  fileUrl: { type: String }, // e.g., URL to cloud storage or static file path
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TaxDoc', taxDocSchema);
