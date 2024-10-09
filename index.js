const express = require("express");
const app = express();
const cors = require("cors");
const { connectToDB } = require("./utilityFundtions/connectToDB");
require("dotenv").config();
const port = process.env.PORT;

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies


// connect to database
connectToDB()

// all route
const user = require('./router/user')

// routers reletad middleware
app.use("/user", user)

// tetsing route
app.get("/", async (req, res) => {
    try {
        res.json({ success: true, message: "server is running" })
    } catch (error) {
        res.json({ success: false, error })
    }
})

app.listen(port, () => {
    console.log(`server is listening to the port ${port}`)
})