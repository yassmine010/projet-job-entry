const EducationController = require("../controller/EducationController")
const route = require("express").Router()

route.post("/add", EducationController.createEducation)
route.get("/get", EducationController.getAllEducations)
route.get("/get/:id", EducationController.getEducationById)
route.put("/put/:id", EducationController.updateEducation)
route.delete("/delete/:id", EducationController.deleteEducation)

module.exports = route
