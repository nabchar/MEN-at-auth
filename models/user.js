import mongoose, { Schema } from 'mongoose';
import crypto from 'crypto';
// Constants
// const SALT_WORK_FACTOR = 10;

// Define user schema
const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: { unique: true },
  },
  hashedPassword: String,
  salt: String,
  session_token: String,
}, { timestamps: true });

// Encrypts password before saving in DB
UserSchema.methods.setPassword = function setPassword(password) {
  const user = this;
  // generate salt and save to user
  user.salt = crypto.randomBytes(16).toString('hex');

  // generate hashed password
  user.hashedPassword = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function validatePassword(password) {
  const user = this;
  const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
  return user.hashedPassword === hash;
};

UserSchema.methods.updateAttr = function updateAttr(firstName, lastName) {
  const user = this;
  if (firstName) {
    user.firstName = firstName;
  }
  if (lastName) {
    user.lastName = lastName;
  }
};

const User = mongoose.model('User', UserSchema);
export default User;
