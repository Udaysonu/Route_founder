const express=require("express")
const path=require("path")

const app=express()
const port=8000
app.set("view engine",'ejs')
app.set("views",path.join(__dirname,'/views'))
app.use(express.static("./assets"))
app.use("/",require("./routes/index"));

app.listen(port,function(err){
    if(err){
        console.log("Error in starting the server");
        return;
    }
    console.log("Server started Succesfully. Port::",port);
})