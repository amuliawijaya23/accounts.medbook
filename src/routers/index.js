const { Router } = require('express');

const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');

const router = Router();

module.exports = () => {
  userRoutes(router);
  authRoutes(router);
  return router;
};
