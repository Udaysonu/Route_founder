const express=require('express');
const router=express.Router();
const bookingController=require("../controllers/bookingcontroller")

router.post("/orderbooking",bookingController.orderbook);
module.exports=router