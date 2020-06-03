const nodemailer = require("nodemailer");
const ejs=require("ejs")
const path=require("path")


//FUNCTIONS ARE WRITTEN IN FOLLOWING ORDER
//1->signup_done 
//2->booking_done
//3->google_done



// async..await is not allowed in global scope, must use a wrapper

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount =  nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "EmailHere", // generated ethereal user
      pass: "Passwordhere" // generated ethereal password
      }
  });

 
  // send mail with defined transport object
var sender=function(data,relativepath){

    //rendering ejs file with relativepath and data to it;
   var renderTemplete=function(data,relativepath)
   {
    ejs.renderFile( path.join(__dirname,relativepath),data,function(err,template)
    {
      if(err)
      {
        console.log("Error in sending email:-",err);
      }
      else
      {
        transporter.sendMail({
          from: 'udaysonubakka143@gmail.com', // sender address
          to: data.user.email , // list of receivers
          subject: "AeroBook", // Subject line
         // plain text body
          html: template// html body
                             });
      }
    })
  }
  renderTemplete(data,relativepath);
}
//   console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...


//function to send mail when user signup is successfull
module.exports.signup_done=function(data){
sender(data,"../views/mail_templates/signup_successful.ejs")
}

//funciton to send mail when authentication using google is successfull
module.exports.google_done=function(data){
  sender(data,"../views/mail_templates/google_auth.ejs")
}

//function to send mail when booking is confirmed
module.exports.booking_done=function(data){
  sender(data,"../views/mail_templates/booking_confirmed.ejs");
}