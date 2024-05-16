const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
  token: { type: String, required: true },
  clientId: { type: String, required: true },
  userId: { type: String, required: true },
  scope: { type: String, required: true },
  expiration: { type: Date, required: true },
});

exports.Token = mongoose.model.Token || mongoose.model('Token', tokenSchema);
exports.findToken = (token) => this.Token.findOne({ token });
