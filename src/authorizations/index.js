const passport = require('passport');
const login = require('connect-ensure-login');
const { getUserMedication, updateUserMedication } = require('../db/controllers/userController');

exports.info = [
  passport.authenticate('bearer', { session: false }),
  function (req, res) {
    return res.status(200).json({ user_id: req.user._id, email: req.user.email, scope: req.authInfo.scope }).end();
  },
];

const ensureValidToken = (scope) => (req, res, next) => {
  const expirationTimestamp = new Date(req.authInfo.expiration).getTime();

  if (expirationTimestamp < new Date().getTime()) {
    return res.sendStatus(401);
  }

  if (!req.authInfo || !req.authInfo.scope || req.authInfo.scope.indexOf(scope) === -1) {
    return res.sendStatus(403);
  }

  return next();
};

exports.userData = [
  passport.authenticate('bearer', { session: false }),
  ensureValidToken('read:userdata'),
  function (req, res) {
    return res.status(200).json(req.user).end();
  },
];

exports.userMedication = [passport.authenticate('bearer', { session: false }), ensureValidToken('read:medication'), getUserMedication];

exports.updateMedication = [passport.authenticate('bearer', { session: false }), ensureValidToken('write:medication'), updateUserMedication];

exports.login = passport.authenticate('local', { failureRedirect: '/login' });

exports.logout = async (req, res, next) => {
  await req.logout((error) => {
    if (error) {
      return next(error);
    }
    return next();
  });
};
exports.account = [
  login.ensureLoggedIn(),
  (req, res) => {
    res.render('account', { user: req.user }).end();
  },
];
