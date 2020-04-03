const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const User = require('./api/models/user.model');
const UserRoute = require('./api/routes/user.route');
require('dotenv').config();

User.sync({ force: true });

app.use(bodyParser.json({}))
app.use('/api/user', UserRoute);

app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`);
});