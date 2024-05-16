const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../db/models/User');

const initializePassport = () => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }),
    async (email, password, done) => {
      try {
        if (!email || !password) {
          return done(null, false);
        }
        const user = await User.getUserByEmail(email);

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
    },
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
};

module.exports = initializePassport;
