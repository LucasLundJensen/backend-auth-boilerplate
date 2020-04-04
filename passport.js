const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./api/models/user.model');

passport.use(new LocalStrategy(
    { usernameField: "email" },
    async(email, password, done) => {
        try {
            const user = await User.findOne({ where: { email }});
            if(!user) return done(null, false);
            const passwordMatch = await bcrypt.compare(password, user.password);
            if(!passwordMatch) return done(null, false);
            return done(null, user);
        } catch (error) {
            console.log(error);
            return done(error, false);
        }
    }
))