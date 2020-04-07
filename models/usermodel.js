var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var path=require('path');
var multer=require('multer');
var AVATAR_PATH=path.join('/uploads/users/avatar/');
//setting up structure of userschema
var UserSchema = new Schema({
  name:  {type:String,required:true}, // String is shorthand for {type: String}
  email:{type:String,required:true},
  password:{type:String,required:true},
  mobile: { type:String,required:true },
  avatar:{type:String}
});
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,"..",AVATAR_PATH))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
UserSchema.statics.avatarPath=AVATAR_PATH;
UserSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
var User = mongoose.model('user',UserSchema);

module.exports=User
