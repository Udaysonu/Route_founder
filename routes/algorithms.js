const express=require("express");
const router=express.Router();
const algocontroller=require("../controllers/algocontroller")

router.post('/path',algocontroller.path_eval);
 
router.get('/',function(req,res){
    res.send("404 page not found");
})
module.exports=router;