const mongoose = require("mongoose")

const interviewEventSchema = new mongoose.Schema({
    start: { type: Date },
    end: { type: Date },
    location: { type: String },
    idcandidature:{type:mongoose.Schema.Types.ObjectId,ref:"candidature"}
})

module.exports = mongoose.model("interviewEvent", interviewEventSchema)
