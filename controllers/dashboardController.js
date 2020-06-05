//requiring required models;
const Booking=require("../models/bookingmodel");
const User=require("../models/usermodel");
const Paths=require("../models/pathmodel");
const algoController=require("../controllers/algocontroller");
const mapi={"Hyderabad":0,"Mumbai":1,"Delhi":2,"Jaipur":3,"Banglore":4,"Kochi":5,"Chennai":6,"Bhopal":7,"Amritsar":8,"Guwahati":9,"Srinagar":10,"Amaravati":11,"Vishakhapatanam":12,"Agra":13};
const revmapi={0:"Hyderabad",1:"Mumbai",2:"Delhi",3:"Jaipur",4:"Banglore",5:"Kochi",6:"Chennai",7:"Bhopal",8:"Amritsar",9:"Guwahati",10:"Srinagar",11:"Amaravati",12:"Vishakhapatanam",14:"Agra"};
//FUNCTIONS ARE WRITTEN IN THE FOLLOWING ORDER
//1->deletePath
//2->updatePath
//3->showPaths
//4->deleteUser
//5->addpath
//6->specificPath
//7->specificUser
//8->updateUser
//9->showUsers
//10->showBookings




//function to delete flight path in database and delte edge in algocontroller algorithm as well
module.exports.deletePath=async function(req,res)
{
    try
    {   
        //Authorization check
       if(req.user.email=="udaysonubakka123@gmail.com")
        {
                //checking if current path exists or not
            var path= await Paths.findById(req.params.id);
            
            //if path exists then delte the path in database and
            //delete the edge in algorithm in algocontroller
            if(path){
                    //deleting the path in database
                    await Paths.findByIdAndDelete(path.id);
                
                    //deleting edge in algo controller
                    await algoController.deletePath(path.source,path.destination);
                    req.flash("success","Path deleted successfully!!"); 
            
            }
            else{
                    req.flash("error","Error in deleting Path!!");
            }
            return res.redirect("/dashboard/flightroutes/");
       }
       else
       {
           req.flash("error","UnAuthorized Access");
           return res.redirect("back");
       }
    }
    //raise error if encountered
    catch(err)
    {
                console.log("Error in dashboardContrller->deletePath",err);
    }

}







//function to update flight path's values in database and algorithm in algocontroller
module.exports.updatePath=async function(req,res)
{
    try 
    {   
        //Authorization check
        if(req.user.email!="udaysonubakka123@gmail.com")
        {
            req.flash("error",'Unauthorized Access!!');
           return res.redirect("back");
        }
                //If either Source or Destination is empty then raise the error and return;
        if(mapi[req.body.source]==undefined || mapi[req.body.destination]==undefined)
        {             
            req.flash("error","Error in updating the path!!");
            return res.redirect("/dashboard/flightroutes/");
        }


        var path=await Paths.findById(req.body.id);
        //if path exists then continue
        if(path){

                //raising error and return if source and destination does not match with database entry
                if(path.source!=req.body.source && path.destination!=req.body.destination)
                {
                    
                    return res.redirect("back");
                }

                //updating values in database with new values
                path.cost=req.body.cost;
                path.distance=req.body.distance;
                path.start_time=req.body.start_time;
                path.end_time=req.body.end_time;
                path.save();
                
                //changing values in algorithm in algocontroller
                await algoController.updatePath(req.body)
                req.flash("success","Path updated successfully !");
        }
        else
        {
            req.flash("error","Error in updating path !");
        }

        return res.redirect("/dashboard/flightroutes/");
    }

    catch(err)
    {
            console.log("Error in dashboardController->updatePath",err);
    }
    
}






//funciton to show all the paths in database
module.exports.showPaths=async function(req,res){

    try
    {   
        //Authorization check
        if(req.user.email!="udaysonubakka123@gmail.com")
        {
            req.flash("error",'Unauthorized Access!!');
           return res.redirect("back");
        }

        //fetch all paths
        var paths=await Paths.find({});
       
        res.render("all_flight_paths",{paths:paths});
    }
    catch(err)
    {
        console.log("Error in dashboardController->showPaths",err);
    }
   
}





module.exports.deleteUser=async function(req,res){
    
   try{
        //Authorization check
        if(req.user.email!="udaysonubakka123@gmail.com")
        {
            req.flash("error",'Unauthorized Access!!');
        return res.redirect("back");
        }


       //deleting the required user
       //finding the user
        user=await User.findById(req.params.id);

        //deleting all the bookings of the user
        for(let booking of user.bookings){
            await Booking.findByIdAndDelete(booking);
        }
        
        //deleting the user itself
        await User.findByIdAndDelete(req.params.id)

        req.flash("success","User Deleted!");
        return res.redirect("/dashboard/allusers");
    
   }
   catch(err){
       console.log("Error in dashboardController->deleteUser",err);
   }
}






//function to render page (addpath);
module.exports.addpath=function(req,res){
    try{

        //Authorization check
        if(req.user.email!="udaysonubakka123@gmail.com")
        {
            req.flash("error",'Unauthorized Access!!');
           return res.redirect("back");
        }
        res.render("addpath");
    }
    catch(err){
        console.log("Error in dashboardController->addpath",err);
    }
    
}




//function to get specific flight path
module.exports.specificPath=async function(req,res){
   try 
   {    
        //Authorization check
        if(req.user.email!="udaysonubakka123@gmail.com")
        {
            req.flash("error",'Unauthorized Access!!');
        return res.redirect("back");
        }
        var details={}
        
        //small check to remove undefined values
        if(req.body.source!=""){
            details.source=req.body.source;
        }
        if(req.body.destination!=""){
            details.destination=req.body.destination
        }
        
        //fetch paths upon given details
        var paths=await Paths.find(details);
            
        res.render("all_flight_paths",{paths:paths});
   }
   catch(err)
   {
       console.log("Error in dashboardController->specificPath",err);
   }
    
}




//function to get specific user
module.exports.specificUser=async function(req,res){
    try
    {   
        //Authorization check
            if(req.user.email!="udaysonubakka123@gmail.com")
            {
                req.flash("error",'Unauthorized Access!!');
            return res.redirect("back");
            }
            var details={};
            //small check to remove undefined while searching
            if(req.body.name!=""){
                details.name=req.body.name;
            }
            if(req.body.email!=""){
                details.email=req.body.email;
            }
        
            //fetch users with given detais
            var users=await User.find(details);  

            res.render("users_dashboard",{users:users});

    }
    catch(err)
    {
            console.log("Error in dashboardController->specificUser",err);
    }
    
}





//function to updateuser details from dashboard
module.exports.updateUser=async function(req,res){
    try
    {    
        //Authorization check
        if(req.user.email!="udaysonubakka123@gmail.com")
        {
            req.flash("error",'Unauthorized Access!!');
           return res.redirect("back");
        }
        //since our data is multi-part and contains files we cannot get data using normal req.body
        //so we user this User.uploadedAvatar to get the data
        User.uploadedAvatar(req,res,async function(err){
            if(err)
            {
                console.log("dashboardController->updateUser->uploadedAvatar",err);
            }
           
            //find user with user id
            var user=await User.findById(req.body.user_id);
            
            //changing the details of the fetched user
            user.name=req.body.name;
            user.password=req.body.password;
            user.mobile=req.body.mobile;
            
            //if user uploads a image then images will be updated
            //else old image remains unchanged
            if(req.file){
                                user.avatar=User.avatarPath+'/'+req.file.filename;      
                        }
           
            user.save();
          
            req.flash('success','Profile Updated Succesfully');
            return res.redirect("/dashboard/allusers/");

        })
        
    }   
    catch(err)
   {
       console.log('Error in dashboardController->updateUser',err);
   }



}



//function to fetch all the users
module.exports.showUsers=async function(req,res)
{
    try
    {   //Authorization check
        if(req.user.email!="udaysonubakka123@gmail.com")
        {
            req.flash("error",'Unauthorized Access!!');
           return res.redirect("back");
        }
        //fetch all users from database
        var users=await User.find({});
        req.flash("info","Fetched Users!")
        res.render("users_dashboard",{users:users});
    }
    catch(err)
    {
        console.log("Error in dashboardController->showUsers",err);
    }
}



//function to fetch all bookings
module.exports.showBookings=async function(req,res){
    try
    {   
        //Authorization check
        if(req.user.email!="udaysonubakka123@gmail.com")
        {
            req.flash("error",'Unauthorized Access!!');
           return res.redirect("back");
        }
        
        //fetch all booking from database;
        var bookings = await Booking.find({}).populate("user_id").sort({createdAt:-1});
        req.flash("info","Fetched Bookings!")
        res.render("booking_dashboard",{bookings:bookings});
    }
    catch(err)
    {

    }
}