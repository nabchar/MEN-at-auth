import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
// import session from 'express-session';
import router from './routes/routes';


// Set up MongoDB
mongoose.connect('mongodb://localhost/auth-test');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DB Connected');
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
const server = app.listen(9000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});
