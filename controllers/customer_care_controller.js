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

    user=await chat_cc.findOne({chat_id:req.params.id})
    if(user){
        console.log("already user exists",user);
        res.json(200);
        return ;
    }
    await chat_cc.create({chat_id:req.params.id},function(err){
        if(err){
            console.log("Error in adding customer to chatlist",err);
            res.json(404) ;
        }
            console.log("Customer created succesfully in Chatlist")
    })
    console.log("customer created succesfully")
    res.json(200)
    return ;
}
module.exports.delete=function(req,res){
    console.log("delete ufnctioanot clalrlewd sfdahlaksjfdilah dfalkds",req.params.id)
    chat_cc.deleteOne({chat_id:req.params.id},function(err){
        if(err){
            console.log("Error in deleting the user in chat list");
            res.json(404);
            return ;
        }
        else{
            console.log("Problems output tree");
        }
        console.log("Successfully deleted the user in the chatlist");
        res.json(200);
    })
}