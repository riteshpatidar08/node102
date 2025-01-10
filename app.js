const express = require('express');
const mongoose = require('mongoose');
const app = express();
const fs = require('fs');
mongoose
  .connect('mongodb://localhost:27017/mongoosedb')
  .then(() => {
    console.log('Database is successfull');
  })
  .catch((err) => {
    console.log(err);
  });

//defining the schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  age: {
    type: Number,
  },
});

//NOTE model === collection

const User = mongoose.model('user', UserSchema);

///creating a new document
// const newUser = new User({
//     name : "Ritesh",
//     email : "ritesh@gmail.com",
//     age : 27
// })

// newUser.save().then((data)=>{
//     console.log('.....newdata',data)
// })

const body = {
  name: 'riteshpatidar@gmail.com',
  email: 'lakshit@gmail.com',
  age: 20,
};


//NOTE Create Method
User.create(body)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

//NOTE READ FIND() METHOD
//operator $gt , $lt , $gte , $lte
User.find({ age: { $gt: 20 } }).then((data) =>
  fs.writeFileSync('./age.json', JSON.stringify(data))
);


app.listen(3000, () => {
  console.log('server is running');
});
