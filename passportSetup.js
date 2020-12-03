const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


const User = require('./model/user');


passport.serializeUser(function(user, done) {
    console.log("I GOT TO SERIALIZE");
    console.log(user);
    done(null, user);
});

passport.deserializeUser(function(id, done) {
    console.log("DESERIALIZATION FUNCTION");
    User.findById(id, function(err, user) {
        done(err, user);
    });
});



// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: "1009295003646-rbh493oj3slpm7n75gpupo4jf8956s1k.apps.googleusercontent.com",
    clientSecret: "T4oWrD2HUgYwjVoaVS89C4ww",
    callbackURL: "https://kanbanboardsapp.herokuapp.com/google/callback"
},
    async function (accessToken, refreshToken, profile, done) {
        // Find ore create user
        console.log("Google profile");
        console.log(profile);
        var user = await User.find({googleId: profile.id});

        if (user.length == 0) {
            user = new User( {
                googleId: profile.id,
                name: profile.displayName,
                email: profile._json.email
            });
            user.save();
        }
        else {
            user = user[0];
        }

        console.log("Google user:")
        console.log(user);

        return done(null, user);
    }
));
