const SkillController = require("../controller/SkillController")
const route = require("express").Router()

// Ajouter un skill
route.post("/add", SkillController.createSkill)

// Récupérer tous les skills
route.get("/get", SkillController.getAllSkills)

// Récupérer un skill par ID
route.get("/get/:id", SkillController.getSkillById)

// Mettre à jour un skill
route.put("/put/:id", SkillController.updateSkill)

// Supprimer un skill
route.delete("/delete/:id", SkillController.deleteSkill)

module.exports = route
