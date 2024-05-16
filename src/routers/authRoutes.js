const passport = require('passport');

const { isNotAuthenticated } = require('../middleware');

module.exports = (router) => {
  router.post(
    '/login',
    isNotAuthenticated,
    passport.authenticate('local', { session: true }),
    (req, res) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      res.status(200).json(req.user).end(),
  );
  router.delete('/logout', async (req, res, next) => {
    await req.logout((error) => {
      if (error) {
        return next(error);
      }
      return res.sendStatus(200);
    });
  });
};
