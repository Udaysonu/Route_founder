const Booking=require("../models/bookingmodel");
const User=require("../models/usermodel");

module.exports.updateUser=function(req,res){
try{
        User.uploadedAvatar(req,res,function(err){
            if(err){
                console.log(err);
            }
           
        User.findById(req.body.user_id,function(err,user){
           user.name=req.body.name;
           user.password=req.body.password;
           user.mobile=req.body.mobile;
            
          if(req.file){
                                        user.avatar=User.avatarPath+'/'+req.file.filename;
                                        console.log(user.avatar);
                                    }
          console.log(req.file)
          user.save();
          console.log(user);
           req.flash('success','Profile Updated Succesfully');
           return res.redirect('back');
        }

         )            })
        
    }
   
   catch(err)
   {
       console.log(err,'Error Encountered while using multer');
   }



}


module.exports.showUsers=function(req,res){
User.find({},function(err,users){
res.render("users_dashboard",{users:users});
})
}

module.exports.showBookings=function(req,res){
Booking.find({},function(err,bookings){
res.render("booking_dashboard",{bookings:bookings});
})

}