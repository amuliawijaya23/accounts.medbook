const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  clientId: { type: String, required: true },
  clientSecret: { type: String, required: true },
});

exports.Client = mongoose.model.Client || mongoose.model('Client', clientSchema);
exports.getClientByClientId = (clientId) => this.Client.findOne({ clientId });
exports.getClientById = (id) => this.Client.findById(id);
exports.createClient = (values) => new this.Client(values).save().then((client) => client.toObject());
