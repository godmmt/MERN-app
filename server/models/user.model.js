import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import AuthController from '../controller/auth.controller.js';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 320,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 1024,
  },
  role: {
    type: String,
    enum: ['student', 'instructor'],
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.isStudent = function () {
  return this.role === 'student';
};

userSchema.methods.isInstructor = function () {
  return this.role === 'instructor';
};

userSchema.methods.isAdmin = function () {
  return this.role === 'admin';
};

// mongoose schema middleware
userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const hash = await AuthController.hashPassword(this.password);
    this.password = hash;
    next();
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err, isMatch);
    }
    cb(null, isMatch);
  });
};

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
