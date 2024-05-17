const { Router } = require('express');

const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');
const clientRoutes = require('./clientRoutes');
const siteRoutes = require('./siteRoutes');

const router = Router();

module.exports = () => {
  userRoutes(router);
  authRoutes(router);
  clientRoutes(router);
  siteRoutes(router);
  return router;
};
