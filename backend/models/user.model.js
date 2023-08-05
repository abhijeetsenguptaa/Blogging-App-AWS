const { DataTypes } = require('sequelize');
const { connection } = require('../configs/connection');

// Define the User model with the required fields
const User = connection.define('users', {
  // First name of the user
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Last name of the user
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Email of the user
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Password of the user
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Age of the user
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // Gender of the user (Enum with allowed values: 'male', 'female', 'other')
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: false,
  },
  // Role of the user (Enum with allowed values: 'admin', 'user')
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    allowNull: false,
    defaultValue: 'user', // Default value set to 'user'
  },
});

// Export the User model for use in other parts of the application
module.exports = { User };
