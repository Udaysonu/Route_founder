//requiring important modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//creating structure of schema
var chatSchema = new Schema(
  {
    chat_id:{     
                  type:Schema.Types.ObjectId, 
                  required:true,
                  ref: 'user'
            },

  },{timestamps:true});

//creating model in database
var User = mongoose.model('chat_customer',chatSchema);
module.exports=User