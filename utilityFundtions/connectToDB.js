const mongoose = require("mongoose")
require("dotenv").config();

const connectToDB = () => {
    console.log(1)
    mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.6oyupqe.mongodb.net/personal_finance`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(res => console.log("Connected to mongob"))
        .catch(err => console.log(`Disconnected to database. Here is the error ${err}`))
}

module.exports = { connectToDB }