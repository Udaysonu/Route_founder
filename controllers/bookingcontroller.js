//import required modules
var User=require("../models/usermodel");
var Booking=require("../models/bookingmodel");
var nodemailer=require("../mailer/nodemailer");




//funciton to return all boookings 
module.exports.showBookings=function(req,res)
{

    Booking.find({user_id:req.user.id}).sort({createdAt:-1}).exec(function(err,bookings)
    {
        if(err)
        {
            
            console.log("Error in bookingcontroller->showBookings",err);
        }
 
        res.render('check_bookings',{bookings:bookings});
    })

}



//function to create booking in te database;
module.exports.orderbook=function(req,res)
{   
    req.body.date=req.cookies.chosenDate
    //create booking with given details
    Booking.create(req.body,function(err,book)
    {   
        //if booking is not successful the throw an error and redirect to error page;
        if(err)
        {   
            console.log("Error in bookingcontroller->orderbook",err);
            res.redirect("/404");
            return 
        }
        //if booking is successfully created in database
        //then we have to add this booking into the booking list of the user who created it
        if(book)
        {   
            //finding the user using authentication id
            User.findById(req.user.id,function(err,user)
            {
                

                //pushing the booking into his booking records
                user.bookings.push(book);
                //saving the database
                user.save();
                req.flash("success","Successfully Booked! Ticket sent to your Email!!");
                if(user)
                {
                
                nodemailer.booking_done({user:{path:book.path,email:req.user.email,name:req.user.name,ticket:book.id,passengers:book.passengers,cost:book.cost}});
                }
            });

        }
        

        res.redirect("/booking/showbooking");
        
    });


}