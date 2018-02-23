import passport from 'passport';
import { Strategy } from 'passport-local';
import User from '../models/user';

passport.serializeUser((user, done) => {
  try {
    done(null, user.email);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((email, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) { return done(err); }
    return done(null, user);
  });
});

passport.use(new Strategy({
  usernameField: 'email',
  passwordField: 'password',
}, (username, password, done) => {
  console.log('Trying to log in user');
  console.log('Email is: ', username);
  console.log('Password is: ', password);
  User.findOne({ email: username }, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    if (!user.validatePassword(password)) { return done(null, false); }
    return done(null, user);
  });
}));


export default passport;
