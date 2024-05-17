const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URL;

const dbConnect = () => {
  if (!MONGODB_URL || MONGODB_URL.length === 0) {
    throw new Error('Please add your MongoDB URL');
  }

  mongoose.Promise = global.Promise;

  mongoose.connect(MONGODB_URL);
  mongoose.connection.on('error', (error) => {
    throw new Error(error);
  });
  mongoose.connection.once('connected', () => {
    console.log('New DB connection established');
  });
};

module.exports = dbConnect;
