const express=require("express");
const router=express.Router();
const passport=require("../config/passport");
const customer_controller=require('../controllers/customer_care_controller')
router.get("/chatroom",passport.checkAuthenticatedUser,customer_controller.customercare)
router.get("/delete_customer/:id",customer_controller.delete)
router.get("/create_customer/:id",customer_controller.create)
module.exports=router;