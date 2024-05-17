const clientController = require('../db/controllers/clientController');

module.exports = (router) => {
  router.post('/client/new', clientController.createNewClient);
};
