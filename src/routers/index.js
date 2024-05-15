const { Router } = require('express');

const userRoutes = require('./userRoutes');

const router = Router();

module.exports = () => {
  userRoutes(router);
  return router;
};
