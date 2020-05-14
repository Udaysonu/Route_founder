const User=require("../models/usermodel");
const mailer=require("../mailer/nodemailer")
//signin controller 
module.exports.signin=function(req,res){
    // info={reciver:"udaysonubakka123@gmail.com","subject":"welcome",text:"text"}
   
    res.render("signin");
}
//signup controller
module.exports.signup=function(req,res){
    res.render("signup");
}

//CREATING USER :: geting user details checking already user exists or not and 
//checking password and repassword are equal or not
// if it details satisfy the above conditions then creating user in database
module.exports.createuser=async function(req,res){
    console.log(req.body);
    user=await User.findOne({email:req.body.email});
    //checking whether user with email already present in database
    if(user){
        console.log("user already presernt",user);
        req.flash("error","Email Already Exists")
        res.redirect("back");
        return;
    }
    //checking password and re_password are equal or not
    if(req.body.password!=req.body.re_password){


        console.log("Password and Re-password does not match");
        req.flash("error","Password and Re_password does not match!!")
        res.redirect("back")
        return ;
    }
    //create user in database
    User.create(req.body,function(err){
        if(err){
            console.log("error",err);
            req.flash("error","Error in creating the user")
            return;
        }
    
    mailer.signup_done({user:req.body})
        console.log("User added succesfully");
         
    })
    req.flash("success","User added successfully!!")

    res.redirect("/user/signin")
}
module.exports.logout=function(req,res){
    if(req.isAuthenticated){
        req.flash("success","You have logged out!!")
        req.logout();
    }
    return res.redirect("/user/signin")
}
//
module.exports.authenticate=function(req,res){
    req.flash("success","Authentication Successfull")
    res.redirect("/user/routesearch");
}
//
module.exports.routesearch=function(req,res){
    
    res.render("search");
}
module.exports.update=function(req,res){
    console.log(req.user.id)
    User.findById(req.user.id,function(err,user){
        if(err){
            console.log(err);
        }
         if(user){
             return res.render("update",{user:user});
        }
        res.redirect("/user/routesearch")

    })
    
}
module.exports.update_user= function(req,res){
     
    
    try{
        
         User.uploadedAvatar(req,res,function(err){
             if(err){
                 console.log(err);
             }
            
            if(req.body.password!=req.body.re_password){
                console.log('passnotpathc')
                req.flash("error","Password and Re_password does not match!!!")
                res.redirect("/user/update")
                return
            }             
          User.findById(req.user.id,function(err,user){
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

             
          
          )
 
             })
         
     }
    
    catch(err)
    {
        console.log(err,'Error Encountered while using multer');
    }
     
}