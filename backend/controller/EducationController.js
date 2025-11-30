const EducationModel = require("../models/EducationModel")
const candidateModel=require("../models/CandidateModel")
// Create Education
exports.createEducation = async (req, res) => {
    try {
        const education = new EducationModel(req.body)
        const savededucation=await education.save()
        res.status(201).json({
            message: "Education créée avec succès",
            data: education
        })
        await candidateModel.findByIdAndUpdate(req.body.idcandidate,{
            $push:{ideducation:savededucation._id}
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Get all Educations
exports.getAllEducations = async (req, res) => {
    try {
        const educations = await EducationModel.find()
        res.status(200).json({
            success: true,
            message: "Liste des educations",
            data: educations
        })
    } catch (error) {
        res.status(400).json({ success: false, message: "Erreur lors de la récupération", data: null })
    }
}

// Get Education by ID
exports.getEducationById = async (req, res) => {
    try {
        const education = await EducationModel.findById(req.params.id)
        if (!education) {
            return res.status(404).json({ success: false, message: "Education introuvable", data: null })
        }
        res.status(200).json({ success: true, message: "Education trouvée", data: education })
    } catch (error) {
        res.status(400).json({ success: false, message: "Erreur lors de la récupération", data: null })
    }
}

// Update Education
exports.updateEducation = async (req, res) => {
    try {
        const education = await EducationModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({ success: true, message: "Education mise à jour", data: education })
    } catch (error) {
        res.status(400).json({ success: false, message: "Erreur lors de la mise à jour", data: null })
    }
}

// Delete Education
exports.deleteEducation = async (req, res) => {
    try {
        const educationdata= await EducationModel.findById(req.params.id)
        if(!educationdata){
            return res.status(404).json({message:"education not found"})
        }
        const candidatedata=await candidateModel.findById(educationdata.idcandidate)
        if (candidatedata && candidatedata.ideducation){
            //pour filtrer l experience et supprimer l experience de cette id 
            candidatedata.ideducation= candidatedata.ideducation.filter((id)=>id.toString()!==req.params.id)
            await candidatedata.save()
        }
        const education = await EducationModel.findByIdAndDelete(req.params.id)
        res.status(200).json({ success: true, message: "Education supprimée", data: education })
    } catch (error) {
        res.status(400).json({ success: false, message: "Erreur lors de la suppression", data: null })
    }
}
