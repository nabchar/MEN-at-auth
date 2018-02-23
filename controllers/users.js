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

const updateUser = function updateUser(firstName, lastName, user) {
  if (firstName) {
    user.firstName = firstName;
  }

  if (lastName) {
    user.lastName = lastName;
  }
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
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.status(404).json(err);
    } else if (!user) {
      res.status(401).json({ error: 'User not found' });
    } else if (authenticateUser(user, req.body.password)) {
      user.resetSessionToken();
      res.status(200).json({
        session_token: user.session_token,
        message: 'User logged in',
      });
    } else {
      res.status(401).json({ error: 'Username or password is incorrect' });
    }
  });
  return res;
};

// =====================
// User Log In
// =====================
const logOut = (req, res) => {
  // some code
  res.status(200).json({ message: 'User logged out' });
};

// =====================
// User Update Password
// =====================
const updatePassword = (req, res) => {
  console.log('Trying to log in user');
  console.log('Request is: ', req.body);
  console.log('Email is: ', req.body.email);
  if (req.body.oldPassword && req.body.newPassword && req.body.email) {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        res.status(404).json(err);
      } else if (!user) {
        res.status(401).json({ error: 'User not found' });
      } else if (authenticateUser(user, req.body.oldPassword)) {
        user.setPassword(req.body.newPassword);
        saveUser(res, user, 'Password Reset');
      } else {
        res.status(401).json({ error: 'Username or password is incorrect' });
      }
    });
  } else {
    res.status(400).json({ error: 'missing required field' });
  }
  return res;
};

// =====================
// User Update Password
// =====================
const updateAccountDetails = (req, res) => {
  console.log('Trying to log in user');
  console.log('Request is: ', req.body);
  console.log('Email is: ', req.body.email);
  const { newFirstName, newLastName } = req.body;
  if ((newFirstName || newLastName) && req.body.email) {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        res.status(404).json(err);
      } else if (!user) {
        res.status(401).json({ error: 'User not found' });
      } else if (authenticateUser(user, req.body.oldPassword)) {
        user.updateAttr(newFirstName, newLastName);
        saveUser(res, user, 'Updated user account details');
      } else {
        res.status(401).json({ error: 'Username or password is incorrect' });
      }
    });
  } else {
    res.status(400).json({ error: 'missing required field' });
  }
  return res;
};

// =====================
// User Update Password
// =====================
const getAccountDetails = (req, res) => {
  console.log('Trying to log in user');
  console.log('Request is: ', req.body);
  console.log('Email is: ', req.body.email);
  if (req.body.oldPassword && req.body.newPassword && req.body.email) {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        res.status(404).json(err);
      } else if (!user) {
        res.status(401).json({ error: 'User not found' });
      } else if (authenticateUser(user, req.body.oldPassword)) {
        res.status(200).json({
          session_token: user.session_token,
          message: 'Password Reset',
        });
      } else {
        res.status(401).json({ error: 'Username or password is incorrect' });
      }
    });
  } else {
    res.status(400).json({ error: 'missing required field' });
  }
  return res;
};

export default {
  signUp,
  logIn,
  logOut,
  updatePassword,
  updateAccountDetails,
  getAccountDetails,
};
