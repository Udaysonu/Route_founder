//import required modules
const express=require('express');
const router=express.Router();
const bookingController=require("../controllers/bookingcontroller");


router.get("/showbooking",bookingController.showBookings)
router.post("/orderbooking",bookingController.orderbook);
module.exports=router