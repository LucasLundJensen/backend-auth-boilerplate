const Sequelize = require('sequelize');
const sequelize = require('../../sequelize');

const User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING,
        required: true
    },
    password: {
        type: Sequelize.STRING,
        required: true
    },
    email: {
        type: Sequelize.STRING,
        required: true
    }
});


module.exports = User;