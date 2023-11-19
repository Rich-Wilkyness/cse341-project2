const express = require('express');

const router = express.Router();

const usersController = require('../controllers/usersController');

router
    .route('/users')
    .get(usersController.getAllUsers)
    .post(usersController.createUser);

router
   .route('/users/:id')
   .get(usersController.getUserById)
   .patch(usersController.updateUserById)
   .delete(usersController.deleteUserById);

module.exports = router;