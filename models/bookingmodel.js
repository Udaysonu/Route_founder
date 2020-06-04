//requiring important modules
var mongoose =require("mongoose");
var Schema=mongoose.Schema;

//creating the structure of schema
var bookingSchema=new Schema({
    user_id:{   type:mongoose.Schema.Types.ObjectId,
                    ref:"user",
                    required:true
            },

    cost:{type:String},

    passengers:{type:String,required:true},

    path:{
            type:String,required:true
         },
    date:{
            type:Date,required:true
    },
    start_time:{
            type:String,required:true
    },
    end_time:{
            type:String,required:true
    },
    journey_time:{
            type:String,required:true
    },
    wait_time:{
            type:String,required:true
    },
    travel_time:{
            type:String,required:true
    }

    },{timestamps:true})



//creating the model in database
const booking=mongoose.model("Booking",bookingSchema);
module.exports=booking;