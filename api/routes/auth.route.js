const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const UserController = require('../controllers/user.controller');
require('dotenv').config();

router.post('/register', async (req, res) => {
    await UserController.createUser(req, res);
})
// Authentication with login details.
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

            let date = new Date();
            date.setDate(date.getDate() + 1);
            date = date.getTime();

            const token = jwt.sign({
                iss: 'webapp',
                sub: user.id,
                exp: date
            }, process.env.SECRET );

            res.cookie(
                'tk', token,
                {
                    httpOnly: true,
                    maxAge: 172800000, // This is technically two days in MS, but it correlates to one?
                    secure: process.env.NODE_ENV === 'production' ? true : false
                }
            );

            res.json({
                userId: user.id,
                token: "JWT " + token
            });

            res.status(200).end();
        });
    })(req, res);
});

// Authentication without login details, but with JWT token.
router.post('/authorize', function(req, res) {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed'
            });
        }

        req.login(user, { session: false }, err => {
            if (err) return res.status(400).json({
                message: err
            });

            let date = new Date();
            date.setDate(date.getDate() + 1);
            date = date.getTime();

            const token = jwt.sign({
                iss: 'webapp',
                sub: user.id,
                exp: date
            }, process.env.SECRET );

            res.cookie(
                'tk', token,
                {
                    httpOnly: true,
                    maxAge: 172800000, // This is technically two days in MS, but it correlates to one?
                    secure: process.env.NODE_ENV === 'production' ? true : false
                }
            );

            res.json({
                userId: user.id,
                token: "JWT " + token
            });

            res.status(200).end();
        });
    })(req, res);
});

router.post('/logout', passport.authenticate("jwt", { session: false }),  async (req, res) => {
    if(req.cookies.tk) {
        res.cookie(
            'tk',
            'undefined',
            {
                maxAge: 0,
                httpOnly: true
            }
        );
    };
    res.status(200).end();
} )
module.exports = router;