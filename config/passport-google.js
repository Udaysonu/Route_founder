var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
var passport=require("passport")
var User=require("../models/usermodel")
passport.use(new GoogleStrategy({
    clientID:     "250691605211-4dlsk0c54esi9ao03pu820ikksv7bjkq.apps.googleusercontent.com",
    clientSecret: "rgRY0uOzTr-oobXP0KJ8DIXy",
    callbackURL: "http://localhost:8000/auth/google/callback",
    passReqToCallback   : true
  },
  function(req, accessToken, refreshToken, profile, done) {
      console.log(profile)
      User.findOne({email:profile.email},function(err,user){
        req.flash("success","User created Successfully")
          if(!user){
            User.create({name:profile.displayName,email:profile.email,password:"1",mobile:"9898989"})
          }
          return done(err, user);
      })
    // User.findOrCreate({ : profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  }
));
module.exports= passport