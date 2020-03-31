const express=require("express");
const router=express.Router();
const passportgoogle=require("../config/passport-google")
const User=require("../models/usermodel")
router.use('/algo',require("./algorithms"));
router.use('/user',require("./users"))
router.get('/auth/google',
  passportgoogle.authenticate('google', { scope: 
      [ 'profile' ,'email'] }
));

router.get( '/auth/google/callback', 
    passportgoogle.authenticate( 'google', { 
        successRedirect: '/user/routesearch',
        failureRedirect: 'back'
}));
router.get('/',function(req,res){
    res.send("404 page not found");
})
module.exports=router;