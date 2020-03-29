const express=require("express");
const router=express.Router();
const usercontroller=require('../controllers/usercontroller')


router.get('/signin',usercontroller.signin)
router.get("/signup",usercontroller.signup)
router.get('/',function(req,res){
    res.send("404 page not found");
})
module.exports=router;