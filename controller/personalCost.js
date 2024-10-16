const { User } = require("../model/user");
const { v4: uuidv4 } = require('uuid');
const { getFormattedDate } = require("../utilityFundtions/getDate");

const personalCost = {

    addTarget: async (req, res) => {
        try {
            const { target, userName } = req.body;

            if (target === isNaN) {
                return res.json({
                    success: false,
                    message: "Provide a number"
                })
            }

            const updating = await User.findOneAndUpdate(
                { userName },
                { personalTarget: target },
                { new: true }
            )

            if (!updating) {
                return res.json({
                    success: false,
                    message: "Failed to add target"
                })
            }
            res.json({
                success: true,
                message: "Successfully added target"
            })


        } catch (error) {
            res.json({
                success: false,
                message: "Failed to add",
                error
            })
        }
    },
    checkTargetExistance: async (req, res) => {
        try {
            const { userName } = req.params;
            const user = await User.findOne({ userName })
            const { personalTarget } = user;
            res.json({ success: true, personalTarget })
        } catch (error) {
            res.json({ success: false, message: "Unable to see. Something went wrong" })
        }
    },
    addCost: async (req, res) => {
        try {
            const { amount, source, myUserName, description } = req.body;

            // creating new cost
            const newCost = {
                amount,
                source,
                description,
                id: uuidv4(),
                date: getFormattedDate()
            }

            const updating = await User.findOneAndUpdate(
                { userName: myUserName },
                { $push: { personalCost: newCost } },
                { new: true }
            )

            if (!updating) {
                return res.json({
                    success: false,
                    message: "Failed to add cost"
                })
            }
            res.json({
                success: true,
                message: "Successfully added cost"
            })

        } catch (error) {
            res.json({
                success: false,
                message: "Failed to add cost",
                error
            })
        }
    },
    updateCost: async (req, res) => {
        try {
            const { userId, costId, amount, source, description } = req.body;

            if (isNaN(amount)) {
                return res.json({
                    success: false,
                    message: "Provide a valid number for amount"
                });
            }

            const updating = await User.findOneAndUpdate(
                { id: userId, "personalCost.id": costId },
                {
                    $set: {
                        "personalCost.$.amount": amount,
                        "personalCost.$.source": source,
                        "personalCost.$.description": description,
                        "personalCost.$.date": getFormattedDate()  // Optionally update the date
                    }
                },
                { new: true }
            );

            if (!updating) {
                return res.json({
                    success: false,
                    message: "Failed to update cost"
                });
            }

            res.json({
                success: true,
                message: "Successfully updated cost"
            });

        } catch (error) {
            res.json({
                success: false,
                message: "Failed to update cost",
                error
            });
        }
    },

    deleteCost: async (req, res) => {
        try {
            const userId = req.params.id;
            const costId = req.params.costId;

            const updating = await User.findOneAndUpdate(
                { id: userId },
                { $pull: { personalCost: { id: costId } } },
                { new: true }
            );

            if (!updating) {
                return res.json({
                    success: false,
                    message: "Failed to delete cost"
                });
            }

            res.json({
                success: true,
                message: "Successfully deleted cost"
            });

        } catch (error) {
            res.json({
                success: false,
                message: "Failed to delete cost",
                error
            });
        }
    },


}

module.exports = { personalCost }