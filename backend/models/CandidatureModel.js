const mongoose=require("mongoose")
const candidatureSchema=new mongoose.Schema({
    cv:{type:String},
    coverLetter : {type:String},
    // note:{type:Number},
    // review :{type:String},
    idcandidate:{type:mongoose.Schema.Types.ObjectId,ref:"user"},//2
    idinterviewEvent:{type:mongoose.Schema.Types.ObjectId,ref:"interviewEvent"},
    idoffer:{type:mongoose.Schema.Types.ObjectId,ref:"offer"}
})
module.exports=mongoose.model("candidature",candidatureSchema)