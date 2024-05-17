const clientController = require('../db/controllers/clientController');

module.exports = (router) => {
  router.post('/api/client/new', clientController.createNewClient);
};
