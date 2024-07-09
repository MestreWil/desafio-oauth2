const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const GOOGLE_CLIENT_ID = '77689777807-uogtip1bhcjbromc11kcupkpimr2smk0.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';


passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
     
      return done(null, profile);
    }
));

passport.serializeUser(function(user, done) {
     done(null, user);
});

passport.deserializeUser(function(user, done) {
     done(null, user);
});