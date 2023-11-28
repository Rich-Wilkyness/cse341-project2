const router = require('express').Router();
const passport = require('passport');
const user = require('./usersRouter');

router.use('/', require('./swagger'));
router.use('/users', (req, res, next) => {
  user(req, res, next);
});
// router.use('/', 
//     (docData = (req, res) => {
//       let docData = {
//         documentationURL: 'https://rich-wilkyness.github.io/cse341-project2/',
//       };
//       res.send(docData);
//     })
// );

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function (req, res, next) { // this clears our session to logout of github
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;

// this index should point to my swagger and all other routes, i need to move my swagger stuff to the swagger.js route. 