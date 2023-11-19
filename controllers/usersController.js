const db = require('../models');
const User = db.users;


exports.getAllUsers = (req, res) => {
    User.find(
        {},
        {}   
    )
    .then((users) => {
        res.send(users);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving users."
        });
    });
};

exports.getUserById = (req, res) => {
    console.log('user id');
    const user_id = req.params.id;
    console.log(user_id);
    User.findById(user_id) 
      .then((user) => {
        if (!user)
          res
            .status(404)
            .send({ message: `User not found with id ${user_id}` });
        else res.send(user);
      })
      .catch((err) => {
            res.status(500).send({
                message: err.message || "An error occurred while retrieving users."
            });
      });
};


exports.createUser = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({ message: "Name field is required." });
        return;
    }
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        active: req.body.active,
        photo: req.body.photo,
        password: req.body.password,
    });
    user 
    .save(user)
    .then((userData) => {
        res.send(userData);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the user."
        });
    });
};

exports.updateUserById = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((userData) => {
      if (!userData) {
        res.status(404).send({
          message: `Cannot update user with id=${id}. Maybe user was not found!`
        });
      } else res.send({userData, message: "User was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating user with id=" + id
      });
    });
};

exports.deleteUserById = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then((userData) => {
      if (!userData) {
        res.status(404).send({
          message: `Cannot delete user with id=${id}. Maybe user was not found!`
        });
      } else res.send({ message: "User was deleted successfully!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete user with id=" + id
      });
    });
};
