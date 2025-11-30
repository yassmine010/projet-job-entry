const CandidateController = require("../controller/CandidateController")
const upload=require("../middelware/upload")
const route = require("express").Router()

// Ajouter un candidat
route.post("/add",upload.single("image"), CandidateController.createCandidate)

// Récupérer tous les candidats
route.get("/get", CandidateController.getallcandidate)

// Récupérer un candidat par ID
route.get("/get/:id", CandidateController.getCandidateById)

// Mettre à jour un candidat
route.put("/put/:id",upload.single("image"), CandidateController.updateCandidate)

// Supprimer un candidat
route.delete("/delete/:id", CandidateController.deleteCandidate)

module.exports = route
