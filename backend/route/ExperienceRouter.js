const ExperienceController = require("../controller/ExperienceController")
const route = require("express").Router()

route.post("/add", ExperienceController.createExperience)
route.get("/get", ExperienceController.getAllExperiences)
route.get("/get/:id", ExperienceController.getExperienceById)
route.put("/put/:id", ExperienceController.updateExperience)
route.delete("/delete/:id", ExperienceController.deleteExperience)

module.exports = route
