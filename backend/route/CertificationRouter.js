const CertificationController = require("../controller/CertificationController")
const route = require("express").Router()

route.post("/add", CertificationController.createCertification)
route.get("/get", CertificationController.getAllCertifications)
route.get("/get/:id", CertificationController.getCertificationById)
route.put("/put/:id", CertificationController.updateCertification)
route.delete("/delete/:id", CertificationController.deleteCertification)

module.exports = route
