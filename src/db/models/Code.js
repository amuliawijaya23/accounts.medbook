const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
  code: { type: String, required: true },
  clientId: { type: String, required: true },
  userId: { type: String, required: true },
  redirectUri: { type: String, required: true },
  scope: { type: String, required: true },
});

exports.Code = mongoose.model.authorizationCode || mongoose.model('Code', codeSchema);
exports.findCode = (code) => this.Code.findOne({ code });
exports.createCode = (values) => new this.Code(values).save().then((code) => code.toObject());
