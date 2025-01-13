const User = require('../models/userModel')

exports.createUser = async (req, res) => {
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
};

exports.getAllUser =  async (req, res) => {
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
}

