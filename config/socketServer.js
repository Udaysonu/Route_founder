
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports.chatserver=function(server){
var io=require("socket.io")(server)
server.listen(80,function(err){


    if(err){
        console.log("Error in starting the Chatserver::port 80");
        return ;
    }
    console.log("ChatServer started Successfull::port 5000");
    return;
})
    io.sockets.on("connection",function(socket){
        var room;
     
    socket.on("join_room",function(data){

        function create_customer(data){
            room=data.room
            var xhrRequest=new XMLHttpRequest()
            xhrRequest.open("get",`/cc/create_customer/${room}`)
        
             console.log(room)
              
        xhrRequest.send();
        xhrRequest.onload=function()
        {
            console.log(xhrRequest.response)
        }
         
    }
    
    create_customer(data);

        console.log("user joined in the room")
        room=data.room
        socket.join(room)        
       io.emit("main_server",data)
       io.in(room).emit("receive_message",{msg:"You Joined to the room"})
       socket.on("send_message",function(data){

        io.in(room).emit("receive_message",data);
    })
        
    })
    socket.on("server_join_room",function(data){
        socket.join(data.room)
        room=data.room
        console.log("Main server joined room")
        io.in(room).emit("receive_message",{msg:"You Joined to the room"})
         
        socket.on("send_message",function(data){

        io.in(room).emit("receive_message",data);
    })
    })
     
    socket.on("disconnect",function(){
        console.log("user disconnected",room)
        function delete_customer(room){
            var xhrRequest=new XMLHttpRequest()
            xhrRequest.open("get",`/cc/delete_customer/${room}`)
        
             console.log(room)
              
        xhrRequest.send();
        xhrRequest.onload=function()
        {
            console.log(xhrRequest.response)
        }
    }
    delete_customer(room)
    io.in(room).emit("receive_message",{msg:"User Left the Room....Please refresh the page "})

        io.emit("User disconnected");
    })
    })
}