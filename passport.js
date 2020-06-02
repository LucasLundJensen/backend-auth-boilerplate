const passport = require('passport');
const passportJWT = require('passport-jwt');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const User = require('./api/models/user.model');
const { UserLoginSchema } = require('./api/schemas/user.schema');
require('dotenv').config();

passport.use(new LocalStrategy(
    { usernameField: "email" },
    async(email, password, done) => {
        try {
            const validated = UserLoginSchema.validate(email, password);
            if(validated.error) {
                console.log("Login validation failed");
                return done(null, false);
            }
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

passport.use(new JWTStrategy (
    {
        jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: process.env.SECRET
    },
    async(jwtPayload, callback) => {
         const user = await User.findOne({ where: { id: jwtPayload.sub }});
         if(!user) return callback("No user found");
         return callback(null, user);
    }
));