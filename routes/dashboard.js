//import required modules
const express=require('express');
const router=express.Router();
const dashboardController=require("../controllers/dashboardController");

router.post("/specificPath",dashboardController.specificPath)
router.post("/specificUser",dashboardController.specificUser)
router.get("/deleteUser/:id",dashboardController.deleteUser)
router.get("/addpath",dashboardController.addpath)
router.post("/createpath",require("../controllers/algocontroller").addPath)
router.get("/deletePath/:id",dashboardController.deletePath)
router.post("/updatePath",dashboardController.updatePath)

router.get("/bookings",dashboardController.showBookings);
router.get("/allusers",dashboardController.showUsers);

router.get("/flightroutes",dashboardController.showPaths);
router.post("/updateUser",dashboardController.updateUser);
router.get("/",function(req,res){
    res.render("dashboard")
})
module.exports=router