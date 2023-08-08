const Sequelize = require('sequelize');
require('dotenv').config()


const connection = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    'host': DB_HOST,
    'dialect': 'mysql'
})





module.exports = { connection };

