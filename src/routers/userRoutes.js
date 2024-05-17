const userController = require('../db/controllers/userController');

const authorization = require('../authorizations');

module.exports = (router) => {
  router.post('/api/user/new', userController.createNewUser);
  router.get('/api/user/medication/:id', userController.getUserMedication);
  router.patch('/api/user/medication/:id/:medicationId', userController.updateUserMedication);
  router.post('/api/user/medication/:id', userController.addUserMedication);
  router.get('/api/user', authorization.info);

  // protected routes
  router.get('/api/user/data', authorization.userData);
  router.get('/api/user/medication', authorization.userMedication);
  router.post('/api/user/medication', authorization.updateMedication);
};
