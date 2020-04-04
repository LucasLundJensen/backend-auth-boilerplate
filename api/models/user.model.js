const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
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
}, {
    hooks: {
        beforeCreate: (user) => {
            user.password = bcrypt.hashSync(user.password, 10);
        }
    }
});

User.validPassword = function(password) {
    const valid = bcrypt.compare(password, user.password);
    if (valid) return true;
    else return false;
}


module.exports = User;