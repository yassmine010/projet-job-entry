const offermodel = require("../models/OfferModel");
const recruitermodel = require("../models/RecruiterModel");
const categorieModel=require("../models/CategorieModel");
exports.createOffer = async (req, res) => {
  try {
    //pour faire une instance et met les informations
    const offer = new offermodel(req.body);
    const savedoffer = await offer.save();
    res.status(202).json({
      message: "offer create avec succes",
      data: savedoffer,
    });
    await recruitermodel.findByIdAndUpdate(req.body.idrecruiter, {
      $push: { idoffer: savedoffer._id },
    }); //5
    await categorieModel.findByIdAndUpdate(req.body.idcategorie,{
        $push :{idoffer :savedoffer._id},
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getallOffers = async (req, res) => {
  try {
    const offers = await offermodel.find().populate("idrecruiter");
    res.status(200).json({
      succes: true,
      message: "offer found",
      data: offers,
    });
  } catch (error) {
    res
      .status(400)
      .json({ succes: false, message: "failed to find offers ", data: null });
  }
};
exports.getOfferById = async (req, res) => {
  try {
    const offerid = req.params.id;

    const offer = await offermodel
      .findById(offerid)
      .populate("idrecruiter") // recruteur associé
      .populate({
        path: "idcandidature", // populate les candidatures
        model: "candidature",
        populate: {
          path: "idcandidate", // populate les informations du candidat dans chaque candidature
          model: "user"
        }
      });

    if (!offer) {
      return res.status(404).json({
        succes: false,
        message: "Offer not found",
        data: null,
      });
    }

    res.status(200).json({
      succes: true,
      message: "Offer found",
      data: offer
    });

  } catch (error) {
    res.status(400).json({
      succes: false,
      message: "Failed to find offer",
      data: null
    });
  }
};

exports.updateOffer = async (req, res) => {
  try {
    const offerid = req.params.id;
    const offer = await offermodel.findByIdAndUpdate(offerid, req.body, {
      new: true,
    });
    res.status(200).json({
      succes: true,
      message: "offer updated ",
      data: offer,
    });
  } catch (error) {
    res
      .status(400)
      .json({ succes: false, message: "failed to update offer ", data: null });
  }
};
exports.deleteOffer = async (req, res) => {
  try {
    const offerid = req.params.id;
    const offerdata = await offermodel.findById(offerid);
    if (!offerdata) {
      return res.status(404).json({ message: "offer not found" });
    }
    const recruiterfdata = await recruitermodel.findById(offerdata.idrecruiter);
    if (recruiterfdata && recruiterfdata.idoffer) {
      //pour filtrer l experience et supprimer l experience de cette id
      recruiterfdata.idoffer = recruiterfdata.idoffer.filter(
        (id) => id.toString() !== req.params.id
      );
      await recruiterfdata.save();
    };
    const categoriedata =await categorieModel.findById(offerdata.idcategorie);
    if(categoriedata && categoriedata.idoffer){
    categoriedata.idoffer=categoriedata.idoffer.filter(
        (id) =>id.toString()!==req.params.id
    );
    await categoriedata.save();
    };

    const offer = await offermodel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      succes: true,
      message: "offer delete ",
      data: offer,
    });
  } catch (error) {
    res
      .status(400)
      .json({ succes: false, message: "failed to delete offer ", data: null });
  }
};
