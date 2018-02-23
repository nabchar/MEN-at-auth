import passport from 'passport';
import { LocalStrategy } from 'passport-local';
import User from '../models/user';

passport.serializeUser((user, done) => {
  try {
    done(null, user.email);
  } catch (err) {
    done(err);
  }
});

passport.deseralizeUser((email, done) => {
  User.findOne({ email })
    .then(user => done(null, user))
    .catch(done);
});

passport.use('lucie', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, (req, email, password, done) => {
  done();
}));


export default passport;
