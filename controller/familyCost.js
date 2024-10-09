const { Family } = require("../model/family");
const { User } = require("../model/user");

const familyCost = {
    addFamilyCostTargetPerMonth: async (req, res) => {
        try {
            const { familyCostTargetPerMonth, myUserName } = req.body;
            const myData = await User.findOne({ userName: myUserName });
            const { myCreatedFamilyId } = myData;
            if (!myCreatedFamilyId) {
                return res.json({ success: false, message: "This family Doesnt exist" })
            }
            const updatingFamilyCostTargetPerMonth = await Family.findOneAndUpdate(
                { familyId: myCreatedFamilyId },
                { familyCostTargetPerMonth },
                { new: true }
            )
            if (!updatingFamilyCostTargetPerMonth) {
                return res.json({ success: false, message: "Failed to  add monthly cost target" })
            }
            res.json({
                success: true,
                message: "Successfully added"
            })


        } catch (error) {
            res.json({ success: false, message: "Failed to add family target" })
        }
    }
}


module.exports = { familyCost }