import express from 'express';
import userActions from '../controllers/users';
import passport from '../utils/passport';

const router = express.Router();

const requireLogin = function requireLogin(req, res, next) {
  if (!req.user) {
    console.log('Require Login failed, redirecting user');
    res.redirect('/login');
  } else {
    next();
  }
};

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

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    successFlash: 'Welcome!',
    failureFlash: 'Invalid username or password.',
  }),
);

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

//
// Profile Page Route
//
router.get('/profile', requireLogin, (req, res) => {
  console.log('Going to profile page for: ', req.session.passport.user);
  res.send(`A protected user profile page ${req.session.passport.user}`);
});

//
// User Logout
//
router.post('/logout', requireLogin, (req, res) => {
  req.logout();
  console.log('Logging out user');
  res.redirect('/login');
});

export default router;
