const CertificationModel = require("../models/CertificationModel")
const candidateModel=require("../models/CandidateModel")
// Create Certification
exports.createCertification = async (req, res) => {
    try {
        const certification = new CertificationModel(req.body)
        const savedcertification= await certification.save()
        res.status(201).json({
            succes: true,
            message: "Certification créée avec succès",
            data: certification
        })
        await candidateModel.findByIdAndUpdate(req.body.idcandidate,{
            $push:{idcertification:savedcertification._id}
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Get all Certifications
exports.getAllCertifications = async (req, res) => {
    try {
        const certifications = await CertificationModel.find()
        res.status(200).json({
            success: true,
            message: "Liste des certifications",
            data: certifications
        })
    } catch (error) {
        res.status(400).json({ success: false, message: "Erreur lors de la récupération", data: null })
    }
}

// Get Certification by ID
exports.getCertificationById = async (req, res) => {
    try {
        const certification = await CertificationModel.findById(req.params.id)
        if (!certification) {
            return res.status(404).json({ success: false, message: "Certification introuvable", data: null })
        }
        res.status(200).json({ success: true, message: "Certification trouvée", data: certification })
    } catch (error) {
        res.status(400).json({ success: false, message: "Erreur lors de la récupération", data: null })
    }
}

// Update Certification
exports.updateCertification = async (req, res) => {
    try {
        const certification = await CertificationModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({ success: true, message: "Certification mise à jour", data: certification })
    } catch (error) {
        res.status(400).json({ success: false, message: "Erreur lors de la mise à jour", data: null })
    }
}

// Delete Certification
exports.deleteCertification = async (req, res) => {
    try {
        const certificationdata= await CertificationModel.findById(req.params.id)
        if(!certificationdata){
            return res.status(404).json({message:"certification not found"})
        }
        const candidatedata=await candidateModel.findById(certificationdata.idcandidate)
        if (candidatedata && candidatedata.idcertification){
            //pour filtrer l experience et supprimer l experience de cette id 
            candidatedata.idcertification= candidatedata.idcertification.filter((id)=>id.toString()!==req.params.id)
            await candidatedata.save()
        }
        const certificationId = req.params.id
        const certification = await CertificationModel.findByIdAndDelete(req.params.id)
        if(!certification){
            return res.status(404).json({
                succes:false,
                message :"certification introuvable",
                data:null
            })
        }
        res.status(200).json({ success: true, message: "Certification supprimée", data: certification })
    } catch (error) {
        res.status(400).json({ success: false, message: "Erreur lors de la suppression", data: null })
    }
}
