const userController = require('../db/controllers/userController');

const authorization = require('../authorizations');

module.exports = (router) => {
  router.post('/user/new', userController.createNewUser);
  router.get('/user/medication/:id', userController.getUserMedication);
  router.patch('/user/medication/:id/:medicationId', userController.updateUserMedication);
  router.post('/user/medication/:id', userController.addUserMedication);
  router.get('/user/info', authorization.info);

  // protected routes
  router.get('/user/data', authorization.userData);
};
