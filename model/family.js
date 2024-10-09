const mongoose = require("mongoose");

const familySchema = new mongoose.Schema({
    familyMembers: [
        {
            name: String,
            email: String,
            userName: String,
            password: String
        }
    ],
    familyName: String,
    familyId: String,
    familyCostTargetPerMonth: Number, 
    familyCostPerMonth: Number
})

const Family = mongoose.model("Family", familySchema)

module.exports = { Family }