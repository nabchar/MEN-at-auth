import passport from '../utils/passport';
import User from '../models/user';

// =================
// Helper Functions
// =================


// user authentication
const authenticateUser = (user, password) => user.validatePassword(password);

// save user to db and return success message
const saveUser = function saveUser(res, user, successMessage) {
  // Save user to DB
  user.save((err) => {
    if (err) {
      console.log('Error while saving user');
      res.status(404).json(err);
    } else {
      console.log('User saved to DB');
      res.status(200).json({
        session_token: user.session_token,
        message: successMessage,
      });
    }
  });
};


// =====================
// User Sign Up
// =====================
const signUp = (req, res) => {
  console.log('Trying to sign up a new user');
  console.log('Request body is: ', req.body);
  console.log('Email is: ', req.body.email);
  if (req.body.email && req.body.password) {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    });

    // salt and hash password
    user.setPassword(req.body.password);

    // save user to DB
    saveUser(res, user, 'User successfuly signed up');
  } else {
    res.status(400).json({ error: 'missing username or password' });
  }

  return res;
};

// =====================
// User Log In
// =====================
const logIn = (req, res) => {
  console.log('Trying to log in user');
  console.log('Request is: ', req.body);
  console.log('Email is: ', req.body.email);
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  });
  console.log('Response is: ', res);
};

// =====================
// User Log In
// =====================
const logOut = (req, res) => {
  // some code
  res.status(200).json({ message: 'User logged out' });
};

// =====================
// User Update Action
// =====================
const updateUserData = (req, res) => {
  console.log('Trying to update user');
  console.log('Request is: ', req.body);
  console.log('Email is: ', req.body.email);
  const currentUser = req.session.passport.user;
  const { newPassword, newFirstName, newLastName } = req.body;
  if (newPassword || newFirstName || newLastName) {
    User.findOne({ email: currentUser }, (err, user) => {
      if (err) {
        res.status(404).json(err);
      } else if (!user) {
        res.status(401).json({ error: 'User not found' });
      } else {
        if (newPassword) { user.setPassword(newPassword); }
        if (newFirstName || newLastName) { user.updateAttr(newFirstName, newLastName); }
        saveUser(res, user, 'Password Reset');
      }
    });
  }
};

export default {
  signUp,
  logIn,
  logOut,
  updateUserData,
};
