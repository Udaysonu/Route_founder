var User=require("../models/usermodel");
var Booking=require("../models/bookingmodel");
var nodemailer=require("../mailer/nodemailer");





module.exports.showBookings=function(req,res){
Booking.find({user_id:req.user.id}).sort({createdAt:-1}).exec(function(err,bookings){
    res.render('check_bookings',{bookings:bookings});
})

}




module.exports.orderbook=function(req,res){
Booking.create(req.body,function(err,book){
    if(err){
        res.redirect("/404");
        return 
    }
    if(book){
        User.findById(req.user.id,function(err,user){
            user.bookings.push(book)
             
            user.save();
            if(user){
            nodemailer.booking_done({user:{path:book.path,email:req.user.email,name:req.user.name,ticket:book.id,passengers:book.passengers,cost:book.cost}})
            req.flash("success","Successfully Booked! Ticket sent to your Email!!")
        }
        });

    }
    

    res.redirect("/user/routesearch");
    
});


}