const mongoose=require("mongoose")
const skillSchema=new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    level:{type:String},
    idcandidate:{type:mongoose.Schema.Types.ObjectId,ref:"candidate"}
})
module.exports=mongoose.model("skill",skillSchema)