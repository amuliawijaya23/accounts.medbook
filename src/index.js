require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http');

const mongoose = require('mongoose');

const PORT = process.env.PORT || 8080;
const MONGODB_URL = process.env.MONGODB_URL;

const app = express();

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

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
