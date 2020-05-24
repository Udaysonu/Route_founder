const Booking=require("../models/bookingmodel");
const User=require("../models/usermodel");
const Paths=require("../models/pathmodel");
const algoController=require("../controllers/algocontroller")
module.exports.deletePath=function(req,res){
    console.log(req.params.id)
Paths.findById(req.params.id,function(err,path){
    var path=path;
    Paths.findByIdAndDelete(path.id,function(err){
        if(err){
            console.log("error in deleting paht");
        }
        console.log("deleted path successfully")
        algoController.deletePath(path.source,path.destination)
    
        return res.redirect("back");

    })
})


}


module.exports.updatePath=function(req,res){
    algoController.updatePath(req.body)
    Paths.findById(req.body.id,function(err,path){
        console.log(path)
        if(path.source!=req.body.source && path.destination!=req.body.destination){
            req.flash("erro","Your tried to change the database! warning counts");
            return res.redirect("back")
        }
        path.cost=req.body.cost
        path.distance=req.body.distance
        path.start_time=req.body.start_time
        path.end_time=req.body.end_time
        path.save()
        return res.redirect("back");
    })
    
}


module.exports.showPaths=function(req,res){
    Paths.find({},function(err,paths){
        res.render("all_flight_paths",{paths:paths})
    })
}


module.exports.deleteUser=function(req,res){
    console.log(req.params.id,"000000000000000000000000000000000")
    User.deleteOne({id:req.params.id},function(err){
        if(err){
            console.log("Error in deleting the user");
        }
        req.flash("success","User Deleted!")
        console.log("deleted succesflly bro all the best");
        return res.redirect("/dashboard/allusers");
     })
}

module.exports.addpath=function(req,res){
    res.render("addpath");

}

module.exports.specificPath=function(req,res){
    var details={}
    if(req.body.source!=""){
        details.source=req.body.source;
    }
    if(req.body.destination!=""){
        details.destination=req.body.destination
    }
    console.log(req.body,"*****************")

    Paths.find(details,function(err,paths){
        console.log(paths,"*************")
        res.render("all_flight_paths",{paths:paths});
        })
    
}

module.exports.specificUser=function(req,res){
    var details={}
    if(req.body.name!=""){
        details.name=req.body.name;
    }
    if(req.body.email!=""){
        details.email=req.body.email
    }
    console.log(req.body,"*****************")

    User.find(details,function(err,users){
        console.log(users,"*************")
        res.render("users_dashboard",{users:users});
        })
    
}






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
Booking.find({}).sort({createdAt:-1}).exec(function(err,bookings){
res.render("booking_dashboard",{bookings:bookings});
})

}