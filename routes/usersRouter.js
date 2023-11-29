const express = require('express');

const router = express.Router();

const usersController = require('../controllers/usersController');

const { isAuthenticated } = require('../middleware/authenticate');

console.log('made it to this file');

// typically add authentication to creating, updating or deleting functions. depends on what you want
router
    .route('/')
    .get(usersController.getAllUsers)
    .post(isAuthenticated, usersController.createUser);

router
   .route('/:id')
   .get(usersController.getUserById)
   .patch(isAuthenticated, usersController.updateUserById)
   .delete(isAuthenticated, usersController.deleteUserById);

module.exports = router;