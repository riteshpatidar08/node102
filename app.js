const express = require('express');
const mongoose = require('mongoose');
const app = express();
const fs = require('fs');
const User = require('./models/userModel.js');
const UserRoutes = require('./routes/userRoutes.js');
const { createUser } = require('./controllers/userControllers.js');
const upload = require('./middleware/upload.js');

app.use(express.json());

mongoose
  .connect('mongodb://localhost:27017/mongoosedb')
  .then(() => {
    console.log('Database is successfull');
  })
  .catch((err) => {
    console.log(err);
  });

//middleware
app.use('/api/v1', UserRoutes);

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

//defining the schema

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
