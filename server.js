const dotenv = require("dotenv").config();

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
// const mongoDB = require('./db/connect');

const port = process.env.PORT || 3000;

const swaggerAutogen = require('swagger-autogen')();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

app
  .use(express.urlencoded({ extended: true }))
  .use(express.json());

app
  .use(session({
    secret: "secret", //setting up a cookie, this is the name of that session cookie. 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // for HTTPS, set `secure: true`
  }));

app
  // basic express session({..}) initialization
  .use(passport.initialize())
  // init passport on every route call - tying it to the session
  .use(passport.session())
  // allow passport to use 'express-session'
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Z-Key, Authorization"
    );
    next();
  });

app
  .use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS']
  }))

app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use('/', require('./routes/index.js'));

passport.use(new GitHubStrategy ({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ github: profile.id}, function(err, user) {    this is how we would link to our mongo database
    // console.log(profile)
    return done(null, profile);
    //});
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.username}` : 'Logged Out')});

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false}),
  (req, res) => {
    req.session.user = req.user; // setting the user that github sends back to us as our session user
    res.redirect('/');
  });


const db = require('./models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


// swagger installs npm install --save-dev swagger-autogen --> npm install swagger-up-express --> copy and paste the swagger related code here and adjust the swagger.json file as needed, usually the patch, put or post interface

// O auto configure - npm install passport --> npm install express-session --> npm install passport-github2 --> add code to app for session and env file --> setup github (settings > developer settings > O Auth Apps > make new > set callback link to whatever your callack will be > create > now generate a new secret and add to your env file as well as the client id > update app) > now settup middleware folder and authentication.js file to check if the user has priveledges > add login and logout to the index route file > add authentication to user routes 