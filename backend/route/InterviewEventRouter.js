const InterviewEventController = require("../controller/InterviewEventController")
const route = require("express").Router()

route.post("/add", InterviewEventController.createInterviewEvent)
route.get("/get", InterviewEventController.getAllInterviewEvents)
route.get("/get/:id", InterviewEventController.getInterviewEventById)
route.put("/put/:id", InterviewEventController.updateInterviewEvent)
route.delete("/delete/:id", InterviewEventController.deleteInterviewEvent)

module.exports = route
