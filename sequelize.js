const Sequelize = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_ADDRESS,
    dialect: 'mariadb',
    pool: {
        min: 0,
        max: 100,
        acquire: 30000,
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection to database has been established");
    })
    .catch(err => {
        console.log(`Error in connecting to database ${err}`);
    })

module.exports = sequelize;