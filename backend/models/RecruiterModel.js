const mongoose = require("mongoose");
const usermodel = require("./UseModel");  // 🔹 import du modèle parent

const recruiterSchema = new mongoose.Schema({
    company: { type: String },
    image: { type: String },

    idoffer:[{type:mongoose.Schema.Types.ObjectId,ref:"offer"}]//1

});

// 🔹 création du discriminant basé sur UserModel
const recruiterModel = usermodel.discriminator("Recruiter", recruiterSchema);

module.exports = recruiterModel;
