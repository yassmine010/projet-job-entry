const mongoose = require("mongoose")

const educationSchema = new mongoose.Schema({
    title: { type: String },
    institution: { type: String },
    dateReception: { type: Date },
    idcandidate:{type:mongoose.Schema.Types.ObjectId,ref:"candidate"}
})

module.exports = mongoose.model("education", educationSchema)
