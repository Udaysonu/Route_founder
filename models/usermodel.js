var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//setting up structure of userschema
var UserSchema = new Schema({
  name:  {type:String,required:true}, // String is shorthand for {type: String}
  email:{type:String,required:true},
  password:{type:String,required:true},
  mobile: { type:String,required:true },
});
var User = mongoose.model('user',UserSchema);
module.exports=User