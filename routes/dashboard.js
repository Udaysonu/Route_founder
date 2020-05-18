const express=require('express');
const router=express.Router();
const dashboardController=require("../controllers/dashboardController")

router.get("/bookings",dashboardController.showBookings);
router.get("/allusers",dashboardController.showUsers);
router.post("/updateUser",dashboardController.updateUser);
router.get("/",function(req,res){
    res.render("dashboard")
})
module.exports=router