const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  clientId: { type: String, required: true },
  userId: { type: String, required: true },
  scope: { type: String, required: true },
});

exports.RefreshToken = mongoose.model.RefreshToken || mongoose.model('RefreshToken', refreshTokenSchema);
exports.findRefreshToken = (token) => this.RefreshToken.findOne({ token });
exports.createRefreshToken = (values) => new this.RefreshToken(values).save().then((token) => token.toObject());
