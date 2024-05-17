const { captureOauthParams } = require('../middleware');

module.exports = (router) => {
  router.get('/', (req, res) => {
    res.render('index');
  });
  router.get('/login', captureOauthParams, (req, res) => {
    res.render('login');
  });
};
