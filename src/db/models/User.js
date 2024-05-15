const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  medical_records: {
    medication: {
      type: [
        {
          name: { type: String, required: true },
          dose: { type: String, required: true },
          frequency: { type: String, required: true },
        },
      ],
      select: false,
    },
  },
});

exports.User = mongoose.model.User || mongoose.model('User', userSchema);
exports.getUserByEmail = (email) => this.User.findOne({ email });
exports.createUser = (values) =>
  new this.User(values).save().then((user) => user.toObject());
exports.getUserById = (id) => this.User.findById(id);
