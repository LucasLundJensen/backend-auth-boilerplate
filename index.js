const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const User = require('./api/models/user.model');
const UserRoute = require('./api/routes/user.route');
const AuthRoute = require('./api/routes/auth.route');
require('dotenv').config();
const passport = require('passport')
require('./passport');

User.sync({ force: false });

app.use(bodyParser.json({}));
app.use(passport.initialize());

app.use('/api/user', UserRoute);
app.use('/api/auth', AuthRoute);

app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`);
});