const User =require("../models/usermodel");
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
  usernameField:'email',
  passwordField:'password'
},
  function(email, password, done){
    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      if (user.password!=password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

//serializing the user
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
//deserializing the user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.setAuthenticatedUser=function(req,res,next){
      console.log(req.user);
      next();
}

module.exports=passport