//importe Mongoose pour pouvoir créer des schémas et parler avec MongoDB.
const mongoose=require("mongoose")
//sert a cree un schema et à définir la forme de tes données.
const offerSchema=new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    exigence:{type:String},
    salary:{type:Number},
    localisation:{type:String},
    datefin:{type:Date},
    status:{type:String},
    idrecruiter:{type:mongoose.Schema.Types.ObjectId,ref:"Recruiter"},//2
    idcandidature:[{type:mongoose.Schema.Types.ObjectId,ref:"candidature"}],
    idcategorie:{type:mongoose.Schema.Types.ObjectId,ref:"categorie"}
})
module.exports=mongoose.model("offer",offerSchema)