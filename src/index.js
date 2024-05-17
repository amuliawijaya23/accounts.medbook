require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');
const partials = require('express-partials');
const errorHandler = require('errorhandler');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const dbConnect = require('./db');

const routers = require('./routers');
const initializePassport = require('./auth');

const PORT = process.env.PORT || 8080;
const SESSION_SECRET = process.env.SESSION_SECRET;

const app = express();

// connect to MongoDB
dbConnect();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(partials());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(errorHandler({ dumpExceptions: true, showStack: true }));
app.use(cookieParser());
app.use(session({ secret: SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// passport config
initializePassport();

app.use('/', routers());

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
