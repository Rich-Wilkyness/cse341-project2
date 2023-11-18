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