const RecruiterController=require("../controller/RecruiterController")
const route=require("express").Router()
const upload=require("../middelware/upload")

route.post("/add",upload.single("image"),RecruiterController.createRecruiter)
route.get("/get",RecruiterController.getallRecruiters)
route.get("/get/:id",RecruiterController.getRecruiterById)
route.put("/put/:id",upload.single("image"),RecruiterController.updateRecruiter)
route.delete("/delete/:id",RecruiterController.deleterecruiter)
module.exports=route