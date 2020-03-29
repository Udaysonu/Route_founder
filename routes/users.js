const express=require("express");
const router=express.Router();
const usercontroller=require('../controllers/usercontroller')

//routing the url to their respective functions
router.get('/signin',usercontroller.signin)
router.get("/signup",usercontroller.signup)
router.post("/createuser",usercontroller.createuser)
router.get('/',function(req,res){
    res.send("404 page not found");
})
module.exports=router;