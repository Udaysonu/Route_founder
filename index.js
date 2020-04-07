//requiring required modules
const express=require("express");
const path=require("path");
const db=require("./config/mongoose");
const app=express();
const port=8000;
const flash=require("connect-flash");
const passport=require("passport");
const passport_local=require("./config/passport");
const session=require("express-session");
const MongoStore = require('connect-mongo')
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');

const expressLayouts=require("express-ejs-layouts");
const flashmiddleware=require("./middleware/flassmiddleware")
const server=require("http").Server(app);
const io=require("./config/socketServer").chatserver(server);
app.use('/uploads',express.static(__dirname+'/uploads'))
//setting up required middlewared
app.use(cookieParser());

app.use(express.urlencoded({extended:true}));
app.use(expressLayouts);
app.use(express.static("./assets"));
app.set("view engine",'ejs');
app.set("views",path.join(__dirname,'/views'));
app.set("layout extractScript", true)
app.set("layout extractStyle", true)

app.use(session({
    name:"Findpath",
    secret:"getsomerawdata",
   
  // using store session on MongoDB using express-session + connect
 
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport_local.setAuthenticatedUser);
app.use(flash());
app.use(flashmiddleware.setFlash);
app.use("/",require("./routes/index"));
//starting the server
app.listen(port,function(err){
    if(err){
        console.log("Error in starting the server");
        return;
    }
    console.log("Server started Succesfully. Port::",port);
});
