import express from 'express';
import userActions from '../controllers/users';

// route middleware to make sure a user is logged in
const isLoggedIn = (req, res, next) => {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }
  // if they aren't redirect them to the home page
  res.redirect('/');
  return null;
};

const router = express.Router();

// Homepage
router.get('/', (req, res) => {
  res.send('Homepage'); // load the index.ejs file
});

//
// Login Routes
//
router.get('/login', (req, res) => {
  res.send('YOU ARE ON THE LOGIN PAGE');
});

router.post('/login', (req, res) => {
  userActions.logIn(req, res);
});

//
// Signup Routes
//
router.get('/signup', (req, res) => {
  res.send('YOU ARE ON THE SIGNUP PAGE');
});

router.post('/signup', (req, res) => {
  // render the page and pass in any flash data if it exists
  userActions.signUp(req, res);
});

// Profile Route
router.get('/profile', isLoggedIn, (req, res) => {
  res.send('A protected user profile page');
});

// Logout
router.get('/logout', (req, res) => {
  userActions.logOut(req, res);
});

export default router;
