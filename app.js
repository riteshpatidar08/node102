const express = require('express');
const mongoose = require('mongoose');
const app = express();
const fs = require('fs');

app.use(express.json());

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

//

//NOTE Create Method
// User.create(body)
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//NOTE READ FIND() METHOD

//operator $gt , $lt , $gte , $lte
// User.find({ age: { $gt: 20 } }).then((data) =>
//   fs.writeFileSync('./age.json', JSON.stringify(data))
// );

//API a create User

//data bhjna hain => post
const createUser = async (req, res) => {
  const { name, email, age } = req.body;
  //data validation in the backend
  const userData = {
    name: name.trim(),
    age,
    email,
  };
  const newUser = await User.create(userData);
  res.status(201).json({
    newUser,
  });
}
app.post('/createuser', createUser );

//get all users api
app.get('/users', async (req, res) => {
  const { age } = req.query;
  try {
    const users = await User.find({ age: { $eq: age } });
    if (!users) {
      return res.status(404).json({
        message: 'No users found , Please try again',
      });
    }
    const totalUsers = await User.countDocuments();
    res.status(200).json({
      totalUsers,
      length: users.length,
      data: users,
    });
  } catch (error) {}
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: 'No users found , Please try again',
      });
    }

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      data: error.message,
    });
  }
});

// findByIdAndDelete
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: 'No users found , Please try again',
      });
    }
    res.status(200).json({
      message: 'User deleted',
      data: user,
    });
  } catch (error) {}
});

app.put('/users/:id', async (req, res) => {
  const newData = req.body;
  const id = req.params.id;
  const user = await User.findByIdAndUpdate(id, newData, { new: true });
  console.log(user);
});
//mvc => model ,  view => react  , controller

app.listen(3000, () => {
  console.log('server is running');
});

// findByIdandUpate();

// updateOne({age : {$set}})
