const routes = require('express').Router();
const user = require('./usersRouter');

routes.use('/', require('./swagger'));
routes.use('/users', user);
routes.use('/', 
    (docData = (req, res) => {
      let docData = {
        documentationURL: 'https://rich-wilkyness.github.io/cse341-project2/',
      };
      res.send(docData);
    })
);

module.exports = routes;