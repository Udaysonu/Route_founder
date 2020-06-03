var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//creating the strucutre of schema
var pathSchema = new Schema({
   source:{
            type:String,   
            required:true
          },
   destination:{   
                    type:String,
                    required:true
                },
   cost:{   
            type:Number,
            required:true
        },
   distance:{
                type:Number,
                required:true
            },
   start_time:{
                type:String,
                required:true
             },
    end_time:{
                type:String,
                required:true
             }
},{timestamps:true});


//creating model in database
var PathInfo = mongoose.model('flightPath',pathSchema);
module.exports=PathInfo