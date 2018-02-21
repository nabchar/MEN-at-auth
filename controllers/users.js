import User from '../models/user';

const authenticateUser = (user, password) => user.validatePassword(password);

//
// User Sign Up
//
const signUp = (req, res) => {
  const user = new User();

  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;

  // salt and hash password
  user.setPassword(req.body.password);

  // save user to DB
  user.save((err) => {
    if (err) {
      res.status(404).json(err);
    }
    res.status(200).json({ session_token: user.session_token });
  });
};

//
// User Log In
//
const logIn = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.status(404).json(err);
    } else if (!user) {
      res.status(401).json({ error: 'User not found' });
    } // authenticate the user
    if (authenticateUser(user, req.body.password)) {
      user.resetSessionToken();
    }
    res.status(401).json({ error: 'Username or password is incorrect' });
  });
};

//
// User Log In
//
const logOut = (req, res) => {
  // some code
  res.status(200).json({ message: 'User logged out' });
};

export default {
  signUp,
  logIn,
  logOut,
};
