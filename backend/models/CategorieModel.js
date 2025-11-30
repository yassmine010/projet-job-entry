const mongoose=require("mongoose")
const categorieSchema=new mongoose.Schema({
    name:{type:String},
    description:{type:String},
    idoffer:[{type:mongoose.Schema.Types.ObjectId,ref:"offer"}]
})
module.exports=mongoose.model("categorie",categorieSchema)