const express = require('express');
const { registeringUser, loginUser, resetPassword, getAllUsers, getUserById, deleteUserById, updateUserById } = require('../controllers/user.controller');

const userRoute = express.Router();

// Register a new user
userRoute.post('/register', registeringUser);

// User login
userRoute.post('/login', loginUser);

// Reset user password
userRoute.post('/reset-password', resetPassword);

// Get all users
userRoute.get('/', getAllUsers);

// Get single user by ID
userRoute.get('/:id', getUserById);

// Delete user by ID
userRoute.delete('/:id', deleteUserById);

// Update user information by ID
userRoute.put('/:id', updateUserById);

module.exports = { userRoute };
