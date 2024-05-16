const passport = require('passport');

module.exports = (router) => {
  router.post(
    '/login',
    passport.authenticate('local', { session: true }),
    (req, res) => res.status(200).json(req.user).end(),
  );
};
