const mongoose = require("mongoose");
const usermodel = require("./UseModel");

const candidateSchema = new mongoose.Schema({
    image: { type: String },
    idexperience:[{type:mongoose.Schema.Types.ObjectId,ref:"experience"}],
    ideducation:[{type:mongoose.Schema.Types.ObjectId,ref:"education"}],
    idskill:[{type:mongoose.Schema.Types.ObjectId,ref:"skill"}],
    idcertification:[{type:mongoose.Schema.Types.ObjectId,ref:"certification"}],
    idcandidature:[{type:mongoose.Schema.Types.ObjectId,ref:"candidature"}]//1
    
});

// Vérifier si le discriminant existe déjà
let Candidate;
try {
    Candidate = usermodel.discriminators?.candidate || usermodel.discriminator("candidate", candidateSchema);
} catch (e) {
    Candidate = mongoose.model("candidate");
}

module.exports = Candidate;
