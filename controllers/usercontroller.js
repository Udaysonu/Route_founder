const User=require("../models/usermodel");
//signin controller 
module.exports.signin=function(req,res){
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
        res.redirect("back");
        return;
    }
    //checking password and re_password are equal or not
    if(req.body.password!=req.body.re_password){
        console.log("Password and Re-password does not match");
        res.redirect("back")
        return ;
    }
    //create user in database
    User.create(req.body,function(err){
        if(err){
            console.log("error",err);
            return;
        }
        console.log("User added succesfully");
        return;
    })
    res.redirect("/user/signin")
}