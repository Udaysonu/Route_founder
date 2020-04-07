const express=require("express");
const router=express.Router();
const usercontroller=require('../controllers/usercontroller')
const passport=require("../config/passport");
//routing the url to their respective functions
router.get('/signin',usercontroller.signin);
router.get("/signup",usercontroller.signup);
router.post("/createuser",usercontroller.createuser);
router.post("/authenticate",passport.authenticate('local',{
    failureRedirect:"back"
}),usercontroller.authenticate);
router.get("/routesearch",usercontroller.routesearch);
router.get("/chatroom",passport.checkAuthenticatedUser,function(req,res){
    res.render("chatbox")
})
router.post("/update_user",passport.checkAuthenticatedUser,usercontroller.update_user)
router.get("/update",passport.checkAuthenticatedUser,usercontroller.update);
router.get("/logout",passport.checkAuthenticatedUser,usercontroller.logout)
router.get('/',function(req,res){
    res.send("404 page not found");
})
 
module.exports=router;