const express = require('express');
const app = express();
require('dotenv').config();
const User = require('./api/models/user.model');
const UserRoute = require('./api/routes/user.route');

User.sync({ force: true });

app.use('/api/user', UserRoute);

app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`);
    
});