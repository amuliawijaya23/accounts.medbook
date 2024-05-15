const userController = require('../db/controllers/userController');

module.exports = (router) => {
  router.post('/user/new', userController.createNewUser);
  router.get('/user/medication/:id', userController.getUserMedication);
  router.patch(
    '/user/medication/:id/:medicationId',
    userController.updateUserMedication,
  );
  router.post('/user/medication/:id', userController.addUserMedication);
};
