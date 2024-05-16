const passport = require('passport');

module.exports = (router) => {
  router.post('/login', passport.authenticate('local', { session: true }), (req, res) => res.status(200).json(req.user).end());
  router.delete('/logout', async (req, res, next) => {
    await req.logout((error) => {
      if (error) {
        return next(error);
      }
      return res.sendStatus(200);
    });
  });
};
