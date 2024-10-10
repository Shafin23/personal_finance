const { personalCost } = require("../controller/personalCost");

const express = require("express");
const router = express.Router();

router.post("/addTarget", personalCost.addTarget)
router.get("/checkTargetExistance/:userName", personalCost.checkTargetExistance)
router.post("/addCost", personalCost.addCost)
router.put("/updateCost", personalCost.updateCost)
router.delete("/deleteCost/:userId/:costId", personalCost.deleteCost)


module.exports =  router 
