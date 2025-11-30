const InterviewEventModel = require("../models/InterviewEventModel")
const candidatureModel =require("../models/CandidatureModel")
exports.createInterviewEvent = async (req, res) => {
    try {
        const interviewEvent = new InterviewEventModel(req.body)
        const savedinterviewEvent= await interviewEvent.save()//3b
        
        res.status(201).json({
            message: "InterviewEvent créé avec succès",
            data: interviewEvent
        })
        await candidatureModel.findByIdAndUpdate(req.body.idcandidature,{
            $push:{idinterviewEvent:savedinterviewEvent._id}
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getAllInterviewEvents = async (req, res) => {
    try {
        const events = await InterviewEventModel.find().populate(
            {
                path:"idcandidature" , 
                model:"candidature"
            }
        )
        res.status(200).json({
            succes: true,
            message: "InterviewEvents trouvés",
            data: events
        })
    } catch (error) {
        res.status(400).json({
            succes: false,
            message: "Erreur lors de la récupération",
            data: null
        })
    }
}

exports.getInterviewEventById = async (req, res) => {
    try {
        const event = await InterviewEventModel.findById(req.params.id)
        if (!event) {
            return res.status(404).json({
                succes: false,
                message: "InterviewEvent non trouvé",
                data: null
            })
        }
        res.status(200).json({
            succes: true,
            message: "InterviewEvent trouvé",
            data: event
        })
    } catch (error) {
        res.status(400).json({
            succes: false,
            message: "Erreur lors de la récupération",
            data: null
        })
    }
}

exports.updateInterviewEvent = async (req, res) => {
    try {
        const event = await InterviewEventModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({
            succes: true,
            message: "InterviewEvent mis à jour",
            data: event
        })
    } catch (error) {
        res.status(400).json({
            succes: false,
            message: "Erreur lors de la mise à jour",
            data: null
        })
    }
}

exports.deleteInterviewEvent = async (req, res) => {
    try {
       
        const delatedinterview= await InterviewEventModel.findByIdAndDelete(req.params.id)
        if(!delatedinterview){
            return res.status(404).json({succes:false,message:"Interview not found"})
        }
        await candidatureModel.findOneAndUpdate(
            {idinterviewEvent:delatedinterview._id},
            {
                $unset:{idinterviewEvent:""}
            }
        )
        res.status(200).json({
            succes: true,
            message: "InterviewEvent supprimé",
            data: delatedinterview 
        })
    } catch (error) {
        res.status(400).json({
            succes: false,
            message: "Erreur lors de la suppression",
            data: null
        })
    }
}
