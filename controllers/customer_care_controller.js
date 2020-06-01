const chat_cc=require("../models/chatmodel");

//function to identify all the active users in the chatbox
module.exports.customercare=async function(req,res){
    try
    {
        //finding every active user in chatbox and populating their details
        var customers=chat_cc.find({}).populate('chat_id');
        return res.render("chatroom_cc",{customers:customers});
    }
    catch(err)
    {
        console.log("Error in customer_care_controller->customercare",err);   
    }
}
