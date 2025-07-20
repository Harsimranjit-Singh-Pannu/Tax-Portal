const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

// TTL index to automatically remove expired tokens
tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Token', tokenSchema);
