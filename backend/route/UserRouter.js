const UserController=require("../controller/UserController")
const route=require("express").Router()
route.post("/add",UserController.createUser)
route.get("/get",UserController.getalluser)
route.get("/get/:id",UserController.getUserById)
route.put("/put/:id",UserController.updateUser)
route.delete("/delete/:id",UserController.deleteUser)
route.post("/login",UserController.login)
route.post("/forget",UserController.forget)
route.post("/reset/:token",UserController.resetPassword)
route.get("/verify/:code",UserController.verify)
route.put("/change-password/:id", UserController.changePassword);
module.exports=route