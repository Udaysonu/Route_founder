const express=require("express");
const router=express.Router();
const usercontroller=require('../controllers/usercontroller')
const passport=require("../config/passport");
//routing the url to their respective functions
router.get('/signin',usercontroller.signin);
router.get("/signup",usercontroller.signup);
router.post("/createuser",usercontroller.createuser);
router.post("/routesearch",passport.authenticate('local',{
    failureRedirect:"back"
}),usercontroller.routesearch);
router.get('/',function(req,res){
    res.send("404 page not found");
})
module.exports=router;