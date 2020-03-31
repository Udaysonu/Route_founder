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
const expressLayouts=require("express-ejs-layouts");
const flashmiddleware=require("./middleware/flassmiddleware")
//setting up required middlewared
app.set("layout extractScripts", true)
app.set("layout extractStyles", true)
app.use(express.urlencoded());
app.use(expressLayouts);
app.set("view engine",'ejs');
app.set("views",path.join(__dirname,'/views'));
app.use(express.static("./assets"));
app.use(session({
    name:"Findpath",
    secret:"getsomerawdata"
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
