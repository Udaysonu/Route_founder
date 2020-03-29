//requiring required modules
const express=require("express")
const path=require("path")
const db=require("./config/mongoose")
const app=express()
const port=8000

//setting up required middlewared
app.use(express.urlencoded())
app.set("view engine",'ejs')
app.set("views",path.join(__dirname,'/views'))
app.use(express.static("./assets"))
app.use("/",require("./routes/index"));


//starting the server
app.listen(port,function(err){
    if(err){
        console.log("Error in starting the server");
        return;
    }
    console.log("Server started Succesfully. Port::",port);
});