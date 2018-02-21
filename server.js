import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
// import session from 'express-session';

import DB_CONFIG from './models/config';
import router from './routes/routes';


// Set up MongoDB
// add valid credentials to .env
mongoose.connect(DB_CONFIG.uri, (error) => {
  if (error) {
    console.error('There was an Error connecting to DB', error);
  }
  console.log('Connected to Mlab');
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DB is alive and well');
});

// Initialize http server
const app = express();

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// routes ***************************
app.use('/', router);

// launch ***************************
const server = app.listen(9000 || process.env.PORT, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});
