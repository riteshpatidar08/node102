import mongoose from 'mongoose';

//document structure name , email
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name must have atleast two character'],
    maxlength: [32, 'Name must not exceed 32 character'],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
});

//collection => model in the mongoose
const User = mongoose.model('User', UserSchema);

export default User;
