// keeps return URL as cookie when session is renewed through client authentication
exports.captureOauthParams = (req, res, next) => {
  if (!req.session.returnTo) {
    return next();
  }
  res.cookie('returnURL', req.session.returnTo);
  return next();
};

exports.ensureValidToken = (scope) => (req, res, next) => {
  const expirationTimestamp = new Date(req.authInfo.expiration).getTime();

  if (expirationTimestamp < new Date().getTime()) {
    return res.sendStatus(401);
  }

  if (!req.authInfo || !req.authInfo.scope || req.authInfo.scope.indexOf(scope) === -1) {
    return res.sendStatus(403);
  }

  return next();
};
