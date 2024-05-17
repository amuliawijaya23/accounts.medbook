const authorization = require('../authorizations');
const oauth2 = require('../oauth2');

module.exports = (router) => {
  router.post('/login', authorization.login, (req, res) => {
    const returnURL = req.cookies.returnURL;

    if (returnURL) {
      res.clearCookie('returnURL');
      res.redirect(`${returnURL}`);
    } else {
      res.redirect('/');
    }
  });
  router.get('/api/logout', authorization.logout);
  router.get('/api/account', authorization.account);
  router.get('/api/oauth/authorize', oauth2.authorization);
  router.post('/api/oauth/authorize/decision', oauth2.decision);
  router.post('/api/oauth/token', oauth2.token);
};
