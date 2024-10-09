const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    userName: String,
    password: String,
    personalTarget: Number,
    personalCost: [{
        amount: Number,
        source: String,
        date: String,
        id: String
    }],
    familyMembershipRequestArray: [{
        familyName: String,
        familyId: String,
        requesterName: String,
        requesterUserName: String,
        responseStatus: String // "pending", "accepted", "rejected"
    }],
    myCreatedFamilyId: String
})

const User = mongoose.model("User", userSchema)

module.exports = { User }