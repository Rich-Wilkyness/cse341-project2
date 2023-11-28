const express = require('express');

const router = express.Router();

const usersController = require('../controllers/usersController');

const { isAuthenticated } = require('../middleware/authenticate');

// typically add authentication to creating, updating or deleting functions. depends on what you want
router
    .route('/users')
    .get(usersController.getAllUsers)
    .post(isAuthenticated, usersController.createUser);

router
   .route('/users/:id')
   .get(usersController.getUserById)
   .patch(isAuthenticated, usersController.updateUserById)
   .delete(isAuthenticated, usersController.deleteUserById);

module.exports = router;