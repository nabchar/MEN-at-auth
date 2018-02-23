import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import flash from 'connect-flash';

import passport from './utils/passport';
import DB_CONFIG from './models/config';
import router from './routes/routes';
import seedDatabase from './seed';
import User from './models/user';


// Set up MongoDB
mongoose.connect(DB_CONFIG.uri, (error) => {
  if (error) {
    console.error('There was an Error connecting to DB', error);
  } else {
    console.log('Connected to Mlab');
  }
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DB is alive and well');

  // Seed DB
  seedDatabase();
});

// Initialize http server
const app = express();

// set up our express application
app
  .use(morgan('combined'))
  .use(cookieParser())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(flash())
  .use(session({
    secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
    resave: false,
    saveUninitialized: false,
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    if (req.session && req.session.user) {
      User.findOne({ email: req.session.user.email }, (err, user) => {
        if (user) {
          req.user = user;
          delete req.user.hashedPassword; // delete the password from the session
          delete req.user.salt; // delete the password from the session
          req.session.user = user; // refresh the session value
          res.locals.user = user;
        }
        // finishing processing the middleware and run the route
        next();
      });
    } else {
      next();
    }
  });

// routes ***************************
app.use('/', router);

// launch ***************************
const server = app.listen(9000 || process.env.PORT, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});
