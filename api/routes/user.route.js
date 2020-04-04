const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.get('/:id', async function(req, res) {
    await UserController.getUserById(req, res);
});

router.get('/', async function(req, res) {
    await UserController.getAllUsers(req, res);
})

/*
* This gets done in the auth route.
router.post('/createUser', async function(req, res) {
    await UserController.createUser(req, res);
})
*/

router.delete('/deleteUser/:id', async function(req, res) {
    await UserController.deleteUserById(req, res);
})

module.exports = router;