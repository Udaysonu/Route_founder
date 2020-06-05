const express=require("express");
const router=express.Router();
const passportgoogle=require("../config/passport-google")
const passport=require("../config/passport")
const User=require("../models/usermodel")
router.use('/algo',passport.checkAuthenticatedUser,require("./algorithms"));
router.use('/user',require("./users"))
router.use("/cc",passport.checkAuthenticatedUser,require("./customercare"));
router.use("/booking",passport.checkAuthenticatedUser,require("./booking"));
router.use("/dashboard",passport.checkAuthenticatedUser,require("./dashboard"));
router.get('/auth/google',
  passportgoogle.authenticate('google', { scope: 
      [ 'profile' ,'email'] }
));
router.get( '/auth/google/callback', 
    passportgoogle.authenticate( 'google', { 
        successRedirect: '/user/routesearch',
        
}));

module.exports=router;