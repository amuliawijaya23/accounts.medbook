exports.captureOauthParams = (req, res, next) => {
  if (!req.session.returnTo) {
    return next();
  }
  res.cookie('returnURL', req.session.returnTo);
  return next();
};
