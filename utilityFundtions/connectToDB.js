const mongoose = require("mongoose")
require("dotenv").config();

const connectToDB = () => {
    mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.yfo5lts.mongodb.net/personal_finance`)
        .then(res => console.log("Connected to mongob"))
        .catch(err => console.log(`Disconnected to database. Here is the error ${err}`))
}

module.exports = { connectToDB }