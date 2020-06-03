//import required modules
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var path=require('path')
const chat_cc=require("../models/chatmodel");

//creates a chat server 
module.exports.chatserver=function(server)
{
    var io=require("socket.io")(server)
    server.listen(5000,function(err)
    {
        if(err)
        {
            console.log("Error in starting the Chatserver::port 80");
            return ;
        }
        console.log("ChatServer started Successfull::port 5000");
        return;
    })

    //establishes a connection
    io.sockets.on("connection",function(socket)
    {
        var room;
        //if someone emits join_room
        //it creates chatroom between specific user and server
        socket.on("join_room", function(data)
        {
            //this function creates a customer in database
            //when user user emits join_room
            //if user already exists in database then removes
            async function create_customer(data)
            {  
                room=data.room
                var user=await chat_cc.findOne({chat_id:room})
                if(user)
                {
                    console.log("already user exists",user);
                    res.json(200);
                    return ;
                }
                await chat_cc.create({chat_id:room},function(err)
                {
                    if(err)
                    {
                        console.log("Error in adding customer to chatlist",err);
                        return
                    }
                        console.log("Customer created succesfully in Chatlist")
                })
            return ;
            }
            //creating customer in database who initiates the chat
            create_customer(data);

        
            room=data.room;
            socket.join(room);        
            io.emit("main_server",data);
            io.in(room).emit("receive_message",{msg:"You Joined to the room"});
            socket.on("send_message",function(data)
            {
            io.in(room).emit("receive_message",data);
            })
        
        })


        //when customercare wants to join the a specific room 
        socket.on("server_join_room",function(data)
        {
            socket.join(data.room)
            room=data.room
            console.log("Main server joined room")
            io.in(room).emit("receive_message",{msg:"Customer Care Representative Joined to the room"})
            
            socket.on("send_message",function(data)
            {    
            io.in(room).emit("receive_message",data);
            })
        })
        

        //when specific person disconnects from the database
        //delete in the database 
        socket.on("disconnect",function()
        {
            //function to delete customer who left the chat in database
            function delete_customer(room)
            {
        
                chat_cc.deleteOne({chat_id:room},function(err)
                {
                    if(err)
                    {
                        console.log("Error in deleting the user in chat list");
                        return ;
                    }
                    else
                    {
                        console.log("Successfully deleted the user in the chatlist");
                    }
                    
                })
            }


            //when the user leaves the chatroom then automatically delete the user
            delete_customer(room)

            //sending message to chatbox when user lefts the chatroom
            io.in(room).emit("receive_message",{msg:"User Left the Room....Please refresh the page "})

            io.emit("User disconnected");
        })
    })
}