exports.isAuthenticated = (req, res, next) => {
  const auth = req.isAuthenticated();

  if (!auth) {
    return res.sendStatus(401);
  }
  return next();
};

exports.isNotAuthenticated = (req, res, next) => {
  const auth = req.isAuthenticated();
  if (auth) {
    return res.sendStatus(403);
  }
  return next();
};
