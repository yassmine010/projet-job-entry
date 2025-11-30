const OfferController=require("../controller/OfferController")
const route=require("express").Router()
route.post("/add",OfferController.createOffer)
route.get("/get",OfferController.getallOffers)
route.get("/get/:id",OfferController.getOfferById)
route.put("/put/:id",OfferController.updateOffer)
route.delete("/delete/:id",OfferController.deleteOffer)
module.exports=route