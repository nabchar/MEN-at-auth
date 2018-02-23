import express from 'express';
import userActions from '../controllers/users';

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

// TODO create a function to ch
// Profile Route
//
router.get('/profile', (req, res) => {
  res.send('A protected user profile page');
});

// Logout
router.get('/logout', (req, res) => {
  userActions.logOut(req, res);
});

export default router;
