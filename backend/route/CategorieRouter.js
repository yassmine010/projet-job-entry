const CategorieController = require("../controller/CategorieController")
const route = require("express").Router()

// Ajouter une catégorie
route.post("/add", CategorieController.createCategorie)

// Récupérer toutes les catégories
route.get("/get", CategorieController.getAllCategories)

// Récupérer une catégorie par ID
route.get("/get/:id", CategorieController.getCategorieById)

// Mettre à jour une catégorie
route.put("/put/:id", CategorieController.updateCategorie)

// Supprimer une catégorie
route.delete("/delete/:id", CategorieController.deleteCategorie)

module.exports = route
