const { DataTypes } = require('sequelize');
const { connection } = require('../configs/connection');
const { User } = require('./user.model');

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
        type: DataTypes.STRING
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
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
});


// Define the association between User and BlogPost
User.hasMany(BlogPost, {
    foreignKey: 'userId', // 'userId' is the foreign key in the BlogPost model that references the User model
});
BlogPost.belongsTo(User, {
    foreignKey: 'userId', // 'userId' is the foreign key in the BlogPost model that references the User model
});

module.exports = BlogPost;
