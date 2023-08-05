const { DataTypes } = require('sequelize');
const { connection } = require('../configs/connection');

const BlogPost = connection.define('BlogPost', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    // Additional fields for a blog post
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    // For associating with the User model
    userId: {
      type : DataTypes.INTEGER,
      references : {
          model : 'users',
          key : 'id'
      }
    },
});

module.exports = BlogPost;
