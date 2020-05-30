const Booking=require("../models/bookingmodel");
const User=require("../models/usermodel");
const Paths=require("../models/pathmodel");
const algoController=require("../controllers/algocontroller")
const mapi={"Abu Dhabi":0,"Bali":1,"Bangkok":2,"Barcelona":3,"Canberra":4,"Colombo":5,"Delhi":6,"Dhaka":7,"Dubai":8,"Hong Kong":9,"Hyderabad":10,"Islamabad":11,"Karachi":12,"Kathmandu":13,"Kuala Lampur":14,"London":15,"Los Angeles":16,"Mecca":17,"Mumbai":18,"New York":19,"Rome":20,"Seoul":21,"Shanghai":22,"Singapore":23};
module.exports.deletePath=function(req,res){
    
Paths.findById(req.params.id,function(err,path){
    var path=path;
    Paths.findByIdAndDelete(path.id,function(err){
        if(err){
            console.log("error in deleting paht");
        }
        
        algoController.deletePath(path.source,path.destination)
    
        return res.redirect("/dashboard/flightroutes/");

    })
})


}


module.exports.updatePath=function(req,res){
    if(mapi[req.body.source]==undefined || mapi[req.body.destination]==undefined){
             
            req.flash("error","Ërror in updating the path!!")
            return res.redirect("/dashboard/flightroutes/");
        
    }

    algoController.updatePath(req.body)
   

    Paths.findById(req.body.id,function(err,path){

        
        if(path.source!=req.body.source && path.destination!=req.body.destination){
            req.flash("erro","Your tried to change the database! warning counts");
            return res.redirect("back")
        }
        path.cost=req.body.cost
        path.distance=req.body.distance
        path.start_time=req.body.start_time
        path.end_time=req.body.end_time
        
        path.save()
        req.flash("success","Path updated successfully !")
        return res.redirect("/dashboard/flightroutes/");
    })
    
}


module.exports.showPaths=function(req,res){
    Paths.find({},function(err,paths){
        res.render("all_flight_paths",{paths:paths})
    })
}


module.exports.deleteUser=function(req,res){
    
    User.deleteOne({id:req.params.id},function(err){
        if(err){
            console.log("Error in deleting the user");
        }
        req.flash("success","User Deleted!")
         
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
    

    Paths.find(details,function(err,paths){
        
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
   

    User.find(details,function(err,users){
     
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
                                    
                                    }
           
          user.save();
          
           req.flash('success','Profile Updated Succesfully');
           return res.redirect("/dashboard/allusers/");
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