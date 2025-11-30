const categorieModel = require("../models/CategorieModel");
const candidateModel = require("../models/CandidateModel");
// Créer une catégorie
exports.createCategorie = async (req, res) => {
  try {
    const categorie = new categorieModel(req.body);
    const savedcategorie = await categorie.save();
    res.status(201).json({
      succes: true,
      message: "Catégorie créée avec succès",
      data: categorie,
    });
    await categorieModel.findByIdAndUpdate(req.body.idcandidate, {
      $push: { idcertification: savedcertification._id },
    });
  } catch (error) {
    res.status(400).json({
      succes: false,
      message: "Erreur lors de la création de la catégorie",
      error: error.message,
    });
  }
};

// Récupérer toutes les catégories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categorieModel.find();
    res.status(200).json({
      succes: true,
      message: "Catégories récupérées avec succès",
      data: categories,
    });
  } catch (error) {
    res.status(400).json({
      succes: false,
      message: "Erreur lors de la récupération des catégories",
      error: error.message,
    });
  }
};

// Récupérer une catégorie par ID
exports.getCategorieById = async (req, res) => {
  try {
    const categorieId = req.params.id;
    const categorie = await categorieModel.findById(categorieId).populate({
      path: "idoffer",
      model: "offer",
      populate: { path: "idrecruiter" , model:"Recruiter" }

    });
    if (!categorie) {
      return res.status(404).json({
        succes: false,
        message: "Catégorie introuvable",
        data: null,
      });
    }
    res.status(200).json({
      succes: true,
      message: "Catégorie trouvée",
      data: categorie,
    });
  } catch (error) {
    res.status(400).json({
      succes: false,
      message: "Erreur lors de la récupération de la catégorie",
      error: error.message,
    });
  }
};

// Mettre à jour une catégorie
exports.updateCategorie = async (req, res) => {
  try {
    const categorieId = req.params.id;
    const categorie = await categorieModel.findByIdAndUpdate(
      categorieId,
      req.body,
      { new: true }
    );
    if (!categorie) {
      return res.status(404).json({
        succes: false,
        message: "Catégorie introuvable",
        data: null,
      });
    }
    res.status(200).json({
      succes: true,
      message: "Catégorie mise à jour avec succès",
      data: categorie,
    });
  } catch (error) {
    res.status(400).json({
      succes: false,
      message: "Erreur lors de la mise à jour de la catégorie",
      error: error.message,
    });
  }
};

// Supprimer une catégorie
exports.deleteCategorie = async (req, res) => {
  try {
    const categorieId = req.params.id;
    const categorie = await categorieModel.findByIdAndDelete(categorieId);
    if (!categorie) {
      return res.status(404).json({
        succes: false,
        message: "Catégorie introuvable",
        data: null,
      });
    }
    res.status(200).json({
      succes: true,
      message: "Catégorie supprimée avec succès",
      data: categorie,
    });
  } catch (error) {
    res.status(400).json({
      succes: false,
      message: "Erreur lors de la suppression de la catégorie",
      error: error.message,
    });
  }
};
