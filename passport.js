const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./api/models/user.model');

passport.use(new LocalStrategy(
    async function(email, password, done) {
        await User.findOne({ email }, function(err, user) {
            if (err) return err;
            if(!user) return done(null, false);
            if(!user.validPassword(password)) return done(null, false);
            return done(null, user);          
        })
    }
))