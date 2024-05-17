const passport = require('passport');
const login = require('connect-ensure-login');

exports.info = [
  passport.authenticate('bearer', { session: false }),
  function (req, res) {
    return res.json({ user_id: req.user._id, email: req.user.email, scope: req.authInfo.scope });
  },
];

const ensureValidToken = (scope) => (req, res, next) => {
  console.log(`ensureScope ${scope} is equal to ${req.authInfo}`);
  console.log('Req User: ', req.user);

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
    return res.json(req.user);
  },
];

exports.loginForm = (req, res) => {
  res.render('login');
};

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
    res.render('account', { user: req.user });
  },
];
