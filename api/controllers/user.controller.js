const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function getUserById(req, res) {
    try {
        const id = req.params.id;
    
        const user = await User.findOne({where: { id }});
        if (!user) {
            res.status(404).json({ message: 'No user found. '});
        } else {
            res.status(200).json({ user });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error '});
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        if (!users) {
            res.status(404).json({ message: 'No users found' });
        } else {
            res.status(200).json({ users });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error '});
    }
}


async function createUser(req, res) {
    try {
        const { username, password, email } = req.body;

        // Add validation if the user already exists.
        const newUser = await User.create({
            username,
            password,
            email
        });

        if (!newUser) {
            res.status(400).json({ message: 'Something went wrong in creation of user '});
        } else {
            
            const token = jwt.sign({
                iss: 'webapp',
                sub: newUser.id
            }, process.env.SECRET );
            
            res.status(201).json({
                userId: newUser.id,
                token: 'JWT ' + token
            });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error '});
    }
}

async function deleteUserById(req, res){
    try {

        const id = req.params.id;

        const deletedUser = await User.destroy({ where: { id } });

        if (!deletedUser) {
            res.status(404).json({ message: 'No user found to delete' });
        } else {
            res.status(200).json({ message: `User ${id} has been deleted.` });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error '});
    }
}

module.exports = {
    getUserById,
    getAllUsers,
    createUser,
    deleteUserById
}