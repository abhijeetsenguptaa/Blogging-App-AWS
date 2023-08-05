require('dotenv').config();
const express = require('express');
const { registeringUser } = require('../controllers/user.controller');

const userRoute = express.Router();


userRoute.post('/register', registeringUser);












module.exports = { userRoute };