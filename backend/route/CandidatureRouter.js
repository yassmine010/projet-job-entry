const CandidatureController = require("../controller/CandidatureController");
const upload = require("../middelware/upload");

const route = require("express").Router();

route.post("/add", upload.single("cv"), CandidatureController.createCandidature);
route.get("/get", CandidatureController.getallCandidatures);
route.get("/get/:id", CandidatureController.getCandidatureById);
route.put("/put/:id", upload.single("cv"), CandidatureController.updateCandidature);
route.delete("/delete/:id", CandidatureController.deletecandidature);


module.exports = route;
