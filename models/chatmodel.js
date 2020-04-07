var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//setting up structure of userschema
var chatSchema = new Schema({
  chat_id:{type:Schema.Types.ObjectId, required:true,ref: 'user'}, 
},{timestamps:true});
var User = mongoose.model('chat_customer',chatSchema);
module.exports=User