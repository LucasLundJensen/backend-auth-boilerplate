const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const UserController = require('../controllers/user.controller');
require('dotenv').config();

router.post('/register', async function(req, res) {
    await UserController.createUser(req, res);
})

router.post('/login', function(req, res) {
    passport.authenticate("local", { session: false }, (err, user, info) => {
        
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed'
            });
        }

        req.login(user, { session: false }, err => {
            if (err) return res.status(400).json({
                message: err
            });

            const token = jwt.sign({
                iss: 'webapp',
                sub: user.id
            }, process.env.SECRET );

            res.setHeader(
                "Set-Cookie",
                `tk=${token}; httpOnly`
            );

            res.json({
                userId: user.id,
                token: "JWT " + token
            });

            res.status(200).end();
        });
    })(req, res);
});

module.exports = router;