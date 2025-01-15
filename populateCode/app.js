import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/userModel.js';
import Post from './models/postModel.js';

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connection is successfull');
});

console.log(process.env.PORT);

async function seedData() {
  //already records available want to delete
  await User.deleteMany();
  await Post.deleteMany();

  const userData = [
    { name: 'Ritesh', email: 'ritesh@gmail.com' },
    { name: 'Anshuman', email: 'anshuman@gmail.com' },
  ];

  const users = await User.create(userData);
  const postdata = [
    { title: 'mern', content: 'Web delveoopment...', author: users[0]._id },
    { title: 'Vite', content: 'Web delveoopment...', author: users[1]._id },
  ];
  const posts = await Post.create(postdata);
  console.log('...post', posts);
  console.log(users);
  console.log('Data seeding successfull');
}

seedData();

async function fatchPost() {
  const posts = await Post.find().populate('author', 'name email');
  console.log(posts, '.........fetched');
}

setTimeout(() => {
  fatchPost();
}, 3000);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running ${process.env.PORT}`);
});
