const { User } = require("../model/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { uid } = require("uid")
require('dotenv').config();
const { userValidation } = require("../utilityFundtions/userValidation");
const { Family } = require("../model/family");

const user = {
    register: async (req, res) => {
        try {
            console.log(req.body)
            const { name, email, password, confirmPassword, userName } = req.body;

            // validate user
            const { success, message } = userValidation(password, confirmPassword, email);

            if (!success) {
                return res.json({
                    message
                })
            }

            // encrypt password
            const encryptedPassword = bcrypt.hashSync(password, 10)

            // register user
            const registering = new User({
                name,
                password: encryptedPassword,
                email,
                userName
            })
            const registrationConfirmed = await registering.save();

            if (!registrationConfirmed) {
                return res.json({
                    success: false,
                    message: "Registration failed"
                })
            }

            res.json({
                success: true,
                message: "Registration successfull"
            })

        } catch (error) {
            res.json({
                success: false,
                error,
                messsage: "Failed to add user"
            })
        }
    },
    login: async (req, res) => {
        try {
            const { emailOrUserNameString, password } = req.body;
            const getUserByEmail = await User.findOne({ email: emailOrUserNameString })
            const getUserByUserName = await User.findOne({ userName: emailOrUserNameString })

            if (!getUserByEmail && !getUserByUserName) {
                return res.json({
                    success: false,
                    message: "User not found"
                })
            }

            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    const token = jwt.sign(
                        { id: user.id },
                        process.env.jwt_token,
                        { expiresIn: '3d' }
                    )
                    res.json({
                        success: true,
                        message: "Login successfull",
                        token
                    })
                } else {
                    res.json({
                        success: false,
                        message: "Wrong password"
                    })
                }
            })

        } catch (error) {
            res.json({
                success: false,
                error,
                message: "Login failed"
            })
        }
    },
    creatingFamily: async (req, res) => {
        try {
            const { familyName, userName } = req.body;
            const familyId = uid(25);
            const newFamily = new Family({ familyName, familyId })
            const savingNewFamily = await newFamily.save()
            if (!savingNewFamily) {
                return res.json({
                    success: false,
                    message: "Failed to create family"
                })
            }

            // save creator information
            await User.findOneAndUpdate(
                { userName },
                { myCreatedFamilyId: familyId },
                { new: true }
            );

            res.json({ success: true, message: "Successfully created family" })

        } catch (error) {
            res.json({
                error,
                success: false,
                message: "Failed to create family"
            })
        }
    },
    inviteFamilyMember: async (req, res) => {
        try {
            const { myUserName, invitingUsersUserName } = req.body;
            const myData = await User.findOne({ userName: myUserName })

            const { myCreatedFamilyId } = myData;

            if (!myCreatedFamilyId) {
                return res.json({
                    success: false,
                    message: "You have not created any family"
                })
            }

            // if family exists
            const getFamilyData = await Family.findOne({ familyId: myCreatedFamilyId })

            // preparing invitation object
            const invitationObject = {
                familyName: getFamilyData.familyName,
                familyId: getFamilyData.familyId,
                requesterName: myData.name,
                requesterUserName: myData.userName,
                responseStatus: "pending"
            }
            const invitationSend = await User.findOneAndUpdate(
                { userName: invitingUsersUserName },
                { $push: { familyMembershipRequestArray: invitationObject } },
                { new: true }
            )
            if (!invitationSend) {
                return res.json({ success: false, message: "Failed to send invitation" })
            }
            res.json({ success: true, message: "Send request" })


        } catch (error) {
            res.json({ success: false, message: "Failed to invite new member" })
        }
    },
    rejectFamilyInvitationRequest: async (req, res) => {
        try {
            const { familyId, myUserName } = req.body;
            await User.findOneAndUpdate(
                { userName: myUserName, "familyMembershipRequestArray.familyId": familyId },
                {
                    $set: {
                        "familyMembershipRequestArray.$.responseStatus": "rejected"
                    }
                },
                { new: true }
            )

            await User.findOneAndUpdate(
                { userName: myUserName },
                { $pull: { familyMembershipRequestArray: { familyId } } },
                { new: true }
            )


        } catch (error) {
            res.json({ success: false, message: "Failed to reject", error })
        }
    },
    acceptFamilyInvitationRequest: async (req, res) => {
        try {
            const { familyId, myUserName } = req.body;
            await User.findOneAndUpdate(
                { userName: myUserName, "familyMembershipRequestArray.familyId": familyId },
                {
                    $set: {
                        "familyMembershipRequestArray.$.responseStatus": "accepted"
                    }
                },
                { new: true }
            )

            await User.findOneAndUpdate(
                { userName: myUserName },
                { $pull: { familyMembershipRequestArray: { familyId } } },
                { new: true }
            )


            const myData = await User.findOne({ userName: myUserName });
            const { name, email, password, userName } = myData;
            await Family.findOneAndUpdate(
                { familyId },
                { $push: { familyMembers: { name, email, password, userName } } },
                { new: true }
            )

            res.json({success: true, message: "accepted the request"})

        } catch (error) {
            res.json({ success: false, message: "Failed to reject", error })
        }
    }
}

module.exports = { user }