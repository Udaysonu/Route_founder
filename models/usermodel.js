var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var path=require('path');
var multer=require('multer');
var AVATAR_PATH=path.join('/uploads/users/avatar/');


//creating the structure of schema
var UserSchema = new Schema({
  name:  {
            type:String,  
            required:true
          }, // String is shorthand for {type: String}
  email:{
            type:String,
            required:true
          },
  password:{
            type:String,
            required:true
          },
  mobile: {
            type:String,
            required:true 
          },
  avatar:{
            type:String
          },
  //maintain the list of bookings
  bookings:[{type:mongoose.Schema.Types.ObjectId,ref:"Booking"}]
});




//code of multer --copied from multer website
//the code basically mainitains a storage structure
//the code scans the multipart data and stores the file in respective folder

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,"..",AVATAR_PATH))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 

UserSchema.statics.avatarPath=AVATAR_PATH;

//telling we receive a single file when multi-part data is passed through uploadedAvatar
//uploadedAvatar basically scans the unreadable multipart data into redable data
//eg. req.body is not visibile normally for multipart data here uploadedAvatar helps to decrypt the data
UserSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');


//creating the user model in database
var User = mongoose.model('user',UserSchema);

module.exports=User
