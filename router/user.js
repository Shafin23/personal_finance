const express = require("express");
const { user } = require("../controller/user");
const router = express.Router();

router.post("/register", user.register)
router.post("/login", user.login)
router.post("/creatingFamily", user.creatingFamily)
router.post("/inviteFamilyMember", user.inviteFamilyMember)
router.post("/rejectFamilyInvitationRequest", user.rejectFamilyInvitationRequest)
router.post("/acceptFamilyInvitationRequest", user.acceptFamilyInvitationRequest)
router.get("/g",user.g)


module.exports =  router