var mongoose =require("mongoose");
var Schema=mongoose.Schema;
var bookingSchema=new Schema({
    user_id:{type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
},
cost:{type:String},
    passengers:{type:String,required:true},
    path:{
        type:String,required:true
    }
},{timestamps:true})
const booking=mongoose.model("Booking",bookingSchema);
module.exports=booking;