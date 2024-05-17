const passport = require('passport');
const login = require('connect-ensure-login');
const { getUserMedication, updateUserMedication } = require('../db/controllers/userController');

const { ensureValidToken } = require('../middleware');

exports.info = [
  passport.authenticate('bearer', { session: false }),
  function (req, res) {
    return res.status(200).json({ user_id: req.user._id, email: req.user.email, scope: req.authInfo.scope }).end();
  },
];

exports.userData = [
  passport.authenticate('bearer', { session: false }),
  ensureValidToken('read:userdata'),
  function (req, res) {
    return res.status(200).json(req.user).end();
  },
];

exports.userMedication = [passport.authenticate('bearer', { session: false }), ensureValidToken('read:medication'), getUserMedication];

const getParamsAndValidateToken = (req, res, next) => {
  const { name, dose, frequency } = req.body;
  console.log('Name is: ', name);
  ensureValidToken(`write:${name}`)(req, res, next);
};

exports.updateMedication = [passport.authenticate('bearer', { session: false }), getParamsAndValidateToken, updateUserMedication];

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
