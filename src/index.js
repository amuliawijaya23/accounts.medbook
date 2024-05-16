require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');
const errorHandler = require('errorhandler');
const session = require('express-session');
const passport = require('passport');

const mongoose = require('mongoose');

const routers = require('./routers');
const initializePassport = require('./auth');

const PORT = process.env.PORT || 8080;
const MONGODB_URL = process.env.MONGODB_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;

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
app.use(cors());
app.use(errorHandler());
app.use(
  session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }),
);
app.use(passport.initialize());
app.use(passport.session());

// passport config
initializePassport();

app.use('/', routers());
app.get('/', (req, res) => res.send('HELLO'));

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
