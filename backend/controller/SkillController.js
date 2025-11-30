const skillModel = require("../models/SkillModel")
const candidateModel=require("../models/CandidateModel")
const SkillModel = require("../models/SkillModel")
// Créer un skill
exports.createSkill = async (req, res) => {
    try {
        const skill = new skillModel(req.body)
        const savedskill=await skill.save()
        res.status(201).json({
            succes: true,
            message: "Skill créé avec succès",
            data: skill
        })
        await candidateModel.findByIdAndUpdate(req.body.idcandidate,{
            $push:{idskill:savedskill._id}
        })
    } catch (error) {
        res.status(400).json({
            succes: false,
            message: "Erreur lors de la création du skill",
            error: error.message
        })
    }
}

// Récupérer tous les skills
exports.getAllSkills = async (req, res) => {
    try {
        const skills = await skillModel.find()
        res.status(200).json({
            succes: true,
            message: "Skills récupérés avec succès",
            data: skills
        })
    } catch (error) {
        res.status(400).json({
            succes: false,
            message: "Erreur lors de la récupération des skills",
            error: error.message
        })
    }
}

// Récupérer un skill par ID
exports.getSkillById = async (req, res) => {
    try {
        const skillId = req.params.id
        const skill = await skillModel.findById(skillId)
        if (!skill) {
            return res.status(404).json({
                succes: false,
                message: "Skill introuvable",
                data: null
            })
        }
        res.status(200).json({
            succes: true,
            message: "Skill trouvé",
            data: skill
        })
    } catch (error) {
        res.status(400).json({
            succes: false,
            message: "Erreur lors de la récupération du skill",
            error: error.message
        })
    }
}

// Mettre à jour un skill
exports.updateSkill = async (req, res) => {
    try {
        const skillId = req.params.id
        const skill = await skillModel.findByIdAndUpdate(skillId, req.body, { new: true })
        if (!skill) {
            return res.status(404).json({
                succes: false,
                message: "Skill introuvable",
                data: null
            })
        }
        res.status(200).json({
            succes: true,
            message: "Skill mis à jour avec succès",
            data: skill
        })
    } catch (error) {
        res.status(400).json({
            succes: false,
            message: "Erreur lors de la mise à jour du skill",
            error: error.message
        })
    }
}

// Supprimer un skill
exports.deleteSkill = async (req, res) => {
    try {
        const skilldata= await SkillModel.findById(req.params.id)
        if(!skilldata){
            return res.status(404).json({message: "skill not found"})

        }
        const candidatedata=await candidateModel.findById(skilldata.idcandidate)
        if (candidatedata && candidatedata.idskill){
            //pour filtrer l experience et supprimer l experience de cette id 
            candidatedata.idskill= candidatedata.idskill.filter((id)=>id.toString()!==req.params.id)
            await candidatedata.save()
        }
        const skillId = req.params.id
        const skill = await skillModel.findByIdAndDelete(skillId)
        if (!skill) {
            return res.status(404).json({
                succes: false,
                message: "Skill introuvable",
                data: null
            })
        }
        res.status(200).json({
            succes: true,
            message: "Skill supprimé avec succès",
            data: skill
        })
    } catch (error) {
        res.status(400).json({
            succes: false,
            message: "Erreur lors de la suppression du skill",
            error: error.message
        })
    }
}
