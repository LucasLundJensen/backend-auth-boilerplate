const User = require('../models/user.model');
const { UserCreateSchema } = require('../schemas/user.schema');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function getUserById(req, res) {
    try {
        const id = req.params.id;
    
        const user = await User.findOne({
            where: { id },
            attributes: [
                "id",
                "username",
                "email",
            ]
        });
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
        const users = await User.find({
            attributes: [
                "id",
                "username",
                "email",
            ]
        });
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

        const validated = UserCreateSchema.validate({ username, password, email });

        if(validated.error) {
            res.status(400).json({ message: 'Input does not follow validation rules.'});
            console.log("Register Validation failed");
            return;
        }

        const emailExists = await User.findOne({where: { email }});
        if(emailExists) {
            res.status(400).json({ message: 'Account with that email already exists' });
            return;
        };

        const newUser = await User.create({
            username,
            password,
            email
        });

        if (!newUser) {
            res.status(400).json({ message: 'Something went wrong in creation of user '});
            return;
        }

        const token = jwt.sign({
            iss: 'webapp',
            sub: newUser.id
        }, process.env.SECRET );
        
        res.status(201).json({
            userId: newUser.id,
            token: 'JWT ' + token
        });

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
            res.status(403).json({ message: 'No user found to delete' });
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