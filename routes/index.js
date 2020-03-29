const express=require("express");
const router=express.Router();



router.use('/user',require("./users"))
router.get('/',function(req,res){
    res.send("404 page not found");
})
module.exports=router;