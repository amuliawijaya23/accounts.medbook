const authorization = require('../authorizations');
const oauth2 = require('../oauth2');
const { captureOauthParams } = require('../middleware');

module.exports = (router) => {
  router.get('/login', captureOauthParams, authorization.loginForm);
  router.post('/login', authorization.login, (req, res) => {
    const returnURL = req.cookies.returnURL;

    if (returnURL) {
      res.clearCookie('returnURL');
      res.redirect(`${returnURL}`);
    } else {
      res.redirect('/');
    }
  });
  router.get('/logout', authorization.logout);
  router.get('/account', authorization.account);
  router.get('/dialog/authorize', oauth2.authorization);
  router.post('/dialog/authorize/decision', oauth2.decision);
  router.post('/oauth/token', oauth2.token);
};
