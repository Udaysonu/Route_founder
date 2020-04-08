const chat_cc=require("../models/chatmodel");
module.exports.customercare=function(req,res){
chat_cc.find().populate('chat_id').exec(function(err,customers){
    console.log("custmers",customers);
    return res.render("chatroom_cc",{customers:customers});
})
   

}
module.exports.create=async function(req,res){
    console.log("here")
    console.log(req.params,req.params.id)

    
}
module.exports.delete=function(req,res){
    console.log("delete ufnctioanot clalrlewd sfdahlaksjfdilah dfalkds",req.params.id)
    
}