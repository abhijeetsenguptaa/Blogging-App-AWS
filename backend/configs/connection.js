const Sequelize = require('sequelize');

const connection = new Sequelize('testing', 'root', '#Abhijeet0@@', {
    'host': 'localhost',
    'dialect': 'mysql'
})




module.exports = { connection };