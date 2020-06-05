var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
var passport=require("passport")
var mailer=require("../mailer/nodemailer");
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
        
          if(!user){
            var data={name:profile.displayName,avatar:profile.picture,email:profile.email,password:"1",mobile:"9898989"}
            User.create({name:profile.displayName,avatar:profile.picture,email:profile.email,password:"1",mobile:"9898989"},function(err,user){
              console.log(user);
              req.flash("success","User created Successfully");
              mailer.google_done({user:data})
              return done(err, user);
            })
          }else{
            req.flash("success","Signin Successful through Google Auth");
            mailer.google_done({user:user});
            return done(err, user);
          }
          
         
      })
    // User.findOrCreate({ : profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  }
));
module.exports= passport