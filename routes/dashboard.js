const express=require('express');
const router=express.Router();
const dashboardController=require("../controllers/dashboardController")

router.get("/bookings",dashboardController.showBookings);
router.get("/",function(req,res){
    res.render("dashboard")
})
module.exports=router