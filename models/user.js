import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
// import bcrypt from 'bcrypt-nodejs';

// Define user schema
const UserSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    index: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
  },
  hash: String,
  salt: String,
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

// UserSchema.methods.setPassword = (password) => {
//   // some code
// };
//
// UserSchema.methods.validPassword = (password) => {
//  // some code
// };

// Export Mongoose User Model
export default mongoose.model('user', UserSchema);
