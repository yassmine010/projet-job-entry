const mongoose = require("mongoose")

const certificationSchema = new mongoose.Schema({
    name: { type: String },
    company: { type: String },
    description: { type: String },
    dateReception: { type: Date },
    idcandidate:{type:mongoose.Schema.Types.ObjectId,ref:"candidate"}
})

module.exports = mongoose.model("certification", certificationSchema)
