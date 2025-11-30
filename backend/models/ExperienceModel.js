const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  title: { type: String },
  company: { type: String },
  description: { type: String },
  role: { type: String },
  dateStart: { type: Date },
  dateEnd: { type: Date },
  idcandidate:{type:mongoose.Schema.Types.ObjectId,ref:"candidate"}
});

module.exports = mongoose.model("experience", experienceSchema);
