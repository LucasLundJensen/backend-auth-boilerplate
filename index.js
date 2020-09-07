const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const passport = require('passport')
const app = express();
const User = require('./api/models/user.model');
const UserRoute = require('./api/routes/user.route');
const AuthRoute = require('./api/routes/auth.route');
require('dotenv').config();
require('./passport');

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

User.sync({ force: false });

app.use(bodyParser.json({}));
app.use(passport.initialize());

app.use('/api/user', UserRoute);
app.use('/api/auth', AuthRoute);

app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`);
});