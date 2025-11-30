const ExperienceModel = require("../models/ExperienceModel")
const candidateModel=require("../models/CandidateModel")
exports.createExperience = async (req, res) => {
    try {
        const experience = new ExperienceModel(req.body)
        const savedexperience = await experience.save()
        res.status(201).json({
            message: "Experience créée avec succès",
            data: experience
        })
       await candidateModel.findByIdAndUpdate(req.body.idcandidate,{
           $push:{idexperience:savedexperience._id}
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getAllExperiences = async (req, res) => {
    try {
        const experiences = await ExperienceModel.find()
        res.status(200).json({
            succes: true,
            message: "Experiences trouvées",
            data: experiences
        })
    } catch (error) {
        res.status(400).json({
            succes: false,
            message: "Erreur lors de la récupération",
            data: null
        })
    }
}

exports.getExperienceById = async (req, res) => {
    try {
        const experience = await ExperienceModel.findById(req.params.id)
        if (!experience) {
            return res.status(404).json({
                succes: false,
                message: "Experience non trouvée",
                data: null
            })
        }
        res.status(200).json({
            succes: true,
            message: "Experience trouvée",
            data: experience
        })
    } catch (error) {
        res.status(400).json({
            succes: false,
            message: "Erreur lors de la récupération",
            data: null
        })
    }
}

exports.updateExperience = async (req, res) => {
    try {
        const experience = await ExperienceModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({
            succes: true,
            message: "Experience mise à jour",
            data: experience
        })
    } catch (error) {
        res.status(400).json({
            succes: false,
            message: "Erreur lors de la mise à jour",
            data: null
        })
    }
}

exports.deleteExperience = async (req, res) => {
    //pour retenir les donnees de l experince et si on supprime l experience dans le candidate on ne trouve pas
    try {
        const experiencedata= await ExperienceModel.findById(req.params.id)
        if (!experiencedata){
            return res.status(404).json({message:"experience not found"
        })
        }
        const candidatedata=await candidateModel.findById(experiencedata.idcandidate)
        if (candidatedata && candidatedata.idexperience){
            //pour filtrer l experience et supprimer l experience de cette id 
            candidatedata.idexperience= candidatedata.idexperience.filter((id)=>id.toString()!==req.params.id)
            await candidatedata.save()
        }
        const experience = await ExperienceModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            succes: true,
            message: "Experience supprimée",
            data: experience
        })
        
    } catch (error) {
        res.status(400).json({
            succes: false,
            message: "Erreur lors de la suppression",
            data: null
        })
    }
}
