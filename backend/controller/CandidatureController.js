const candidaturemodel=require("../models/CandidatureModel")
const candidateModel=require("../models/CandidateModel")//3
const offermodel=require("../models/OfferModel")
exports.createCandidature=async(req,res)=>{
    try {
        if(req.file){
            req.body.cv=req.file.filename
        }
        //pour faire une instance et met les informations
        const candidature=new candidaturemodel(req.body)
        const savedcandidature= await candidature.save()//4
        res.status(202).json({
            message:"candidature create avec succes",
            data:candidature
        })
        await candidateModel.findByIdAndUpdate({_id:req.body.idcandidate},{
            $push:{idcandidature:savedcandidature._id}
        })//5
        await offermodel.findByIdAndUpdate(req.body.idoffer,{
            $push:{idcandidature:savedcandidature._id}
        })
        
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }
}
exports.getallCandidatures = async (req, res) => {
  try {
    const candidatures = await candidaturemodel.find()
      .populate({
        path: "idoffer",
        model:"offer",
        populate: { path: "idrecruiter" , model:"Recruiter" }
      });

    res.status(200).json({
      succes: true,
      message: "candidature found",
      data: candidatures
    });
  } catch (error) {
    console.error(error); // 👈 log pour voir l’erreur exacte
    res.status(400).json({
      succes: false,
      message: "failed to find candidatures",
      data: null
    });
  }
};

exports.getCandidatureById=async(req,res)=>{
    try{
        const candidatureid=req.params.id
        const candidature=await candidaturemodel.findById(candidatureid)
        if (!candidature){return res.status(404).json({
            succes:false,
            message:"candidature not found ",
            data:null 
        })}
        res.status(200).json({succes:true,
        message:"candidature found",
        data:candidature})
    }
    catch(error){
        res.status(400).json({succes:false,
        message:"failed to find candidatures ",
        data:null })

    }
}
exports.updateCandidature=async(req,res)=>{
    try{
        const candidatureid=req.params.id
        const candidature=await candidaturemodel.findByIdAndUpdate(candidatureid,req.body,{new:true})
        res.status(200).json({
            succes:true,
            message:"candidature updated ",
            data:candidature})
    }
    catch(error){
        res.status(400).json({succes:false,
        message:"failed to update candidature ",
        data:null })

    }
}
exports.deletecandidature = async (req, res) => {
    try {
      // 1️⃣ Récupérer la candidature
      const candidatureData = await candidaturemodel.findById(req.params.id);
      if (!candidatureData) {
        return res.status(404).json({ succes: false, message: "Candidature introuvable", data: null });
      }
  
      // 2️⃣ Mettre à jour le candidat
      const candidateData = await candidateModel.findById(candidatureData.idcandidate);
      if (candidateData && candidateData.idcandidature) {
        candidateData.idcandidature = candidateData.idcandidature.filter(
          (id) => id.toString() !== req.params.id
        );
        await candidateData.save();
      }
  
      // 3️⃣ Mettre à jour l'offre
      const offerData = await offermodel.findById(candidatureData.idoffer);
      if (offerData && offerData.idcandidature) {
        offerData.idcandidature = offerData.idcandidature.filter(
          (id) => id.toString() !== req.params.id
        );
        await offerData.save();
      }
  
      // 4️⃣ Supprimer la candidature
      await candidaturemodel.findByIdAndDelete(req.params.id);
  
      // 5️⃣ Réponse
      res.status(200).json({
        succes: true,
        message: "Candidature supprimée",
        data: candidatureData
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({
        succes: false,
        message: "Échec de la suppression",
        data: null
      });
    }
  };
  