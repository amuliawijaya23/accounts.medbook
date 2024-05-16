const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  clientId: { type: String, required: true },
  clientSecret: { type: String, required: true },
});

exports.Client = mongoose.model.Client || mongoose.model('Client', clientSchema);
