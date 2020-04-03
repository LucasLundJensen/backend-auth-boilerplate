const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.get('/:id', async function(req, res) {
    await UserController.getUser(req, res);
});


module.exports = router;