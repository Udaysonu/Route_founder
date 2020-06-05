const express=require("express");
const router=express.Router();
const passport=require("../config/passport");
const customer_controller=require('../controllers/customer_care_controller')

//apply authentication before accessing page
router.get("/chatroom",passport.checkAuthenticatedUser,customer_controller.customercare)
module.exports=router;