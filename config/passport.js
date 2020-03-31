const User =require("../models/usermodel");
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
  usernameField:'email',
  passwordField:'password',
  passReqToCallback:true
},
  function(req,email, password, done){
    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        req.flash("error","Incorrect Usernamr or Password")
        return done(null, false, { message: 'Incorrect username.' });
      }

      if (user.password!=password) {
        req.flash("error",'Incorrect username or password')
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
      res.locals.user=req.user;
      next();
}

module.exports=passport