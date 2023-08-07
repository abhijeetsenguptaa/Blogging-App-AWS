const Sequelize = require('sequelize');
require('dotenv').config()


const connection = new Sequelize('blogging', 'admin', 'Abhijeet0', {
    'host': 'database-1.cizw8pjlomm7.ap-south-1.rds.amazonaws.com',
    'dialect': 'mysql'
})






module.exports = { connection };

