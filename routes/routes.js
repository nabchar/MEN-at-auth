import express from 'express';

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

// =====================================
// HOME PAGE (with login links) ========
// =====================================
router.get('/', (req, res) => {
  res.send('Homepage'); // load the index.ejs file
});

// =====================================
// LOGIN ===============================
// =====================================
// show the login form
router.get('/login', (req, res) => {
  // render the page and pass in any flash data if it exists
  res.send('Login');
});

// process the login form
// router.post('/login', do all our passport stuff here);

// =====================================
// SIGNUP ==============================
// =====================================
// show the signup form
router.get('/signup', (req, res) => {
  // render the page and pass in any flash data if it exists
  res.send('Signup');
});

// process the signup form
// router.post('/signup', do all our passport stuff here);

// =====================================
// PROFILE SECTION =====================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn )
router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile.ejs', {
    user: req.user, // get the user out of session and pass to template
  });
});

// =====================================
// LOGOUT ==============================
// =====================================
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

export default router;
