const express = require("express");
const { familyCost } = require("../controller/familyCost");
const router = express.Router();

router.post("/addFamilyCostTargetPerMonth", familyCost.addFamilyCostTargetPerMonth)

module.exports = router 