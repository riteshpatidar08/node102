//express ko require
const express = require('express');
//express.Router() ;
const { createUser } = require('./../controllers/userControllers');
const userRoutes = express.Router();

userRoutes.post('/createuser', createUser);


module.exports = userRoutes;
