const Booking=require("../models/bookingmodel");



module.exports.showBookings=function(req,res){

Booking.find({},function(err,bookings){
res.render("booking_dashboard",{bookings:bookings});
})

}