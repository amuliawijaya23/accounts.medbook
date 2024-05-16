const userController = require('../db/controllers/userController');

const { isAuthenticated, isNotAuthenticated } = require('../middleware');

module.exports = (router) => {
  router.post('/user/new', isNotAuthenticated, userController.createNewUser);
  router.get('/user/medication/:id', isAuthenticated, userController.getUserMedication);
  router.patch('/user/medication/:id/:medicationId', isAuthenticated, userController.updateUserMedication);
  router.post('/user/medication/:id', isAuthenticated, userController.addUserMedication);
};
