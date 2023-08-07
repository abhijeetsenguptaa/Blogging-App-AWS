const { DataTypes } = require('sequelize');
const { connection } = require('../configs/connection');
const BlogPost = require('./blog.model');
const { User } = require('./user.model');

const Comment = connection.define('comments', {
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    blogID: {
        type: DataTypes.INTEGER,
        references: {
            model: BlogPost,
            key: 'id'
        }
    }
});

// Create associations between models
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Comment.belongsTo(BlogPost, { foreignKey: 'blogID', as: 'blogPost' });

// Define hasMany associations for User and BlogPost models
User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
BlogPost.hasMany(Comment, { foreignKey: 'blogID', as: 'comments' });

module.exports = Comment;
