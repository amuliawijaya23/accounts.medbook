const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BasicStrategy = require('passport-http').BasicStrategy;
const ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const User = require('../db/models/User');
const Client = require('../db/models/Client');
const Token = require('../db/models/Token');

const initializePassport = () => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        if (!email || !password) {
          return done(null, false);
        }

        const user = await User.getUserByEmail(email).select('+password');

        if (!user) {
          return done(null, false);
        }

        if (!(await bcrypt.compare(password, user.password))) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }),
  );

  // eslint-disable-next-line no-underscore-dangle
  passport.serializeUser((user, done) => done(null, user._id));

  passport.deserializeUser(async (id, done) => {
    try {
      if (!id) {
        return done(null, false);
      }

      const user = await User.getUserById(id);

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  });

  // BasicStrategy and ClientPasswordStrategy

  passport.use(
    new BasicStrategy(async (username, password, done) => {
      try {
        if (!username || !password) {
          return done(null, false);
        }

        const client = await Client.getClientByClientId(username);

        if (!client) {
          return done(null, false);
        }

        if (password !== client.clientSecret) {
          return done(null, false);
        }

        return done(null, client);
      } catch (error) {
        return done(error);
      }
    }),
  );

  passport.use(
    new ClientPasswordStrategy(async (clientId, clientSecret, done) => {
      try {
        if (!clientId || !clientSecret) {
          return done(null, false);
        }

        const client = await Client.getClientByClientId(clientId);

        if (!client) {
          return done(null, false);
        }

        if (clientSecret !== client.clientSecret) {
          return done(null, false);
        }

        return done(null, client);
      } catch (error) {
        return done(error);
      }
    }),
  );

  // BearerStrategy

  passport.use(
    new BearerStrategy(async (accessToken, done) => {
      try {
        if (!accessToken) {
          return done(null, false);
        }

        const token = await Token.findToken(accessToken);

        if (!token) {
          return done(null, false);
        }

        const user = await User.getUserById(token.userId);

        if (!user) {
          return done(null, false);
        }

        const info = { scope: token.scope, expiration: token.expiration };
        return done(null, user, info);
      } catch (error) {
        return done(error);
      }
    }),
  );
};

module.exports = initializePassport;
