
const express = require("express")

const app = express()

app.use(express.json())
require('dotenv').config()

const {connection}  = require("./config/db.js")
const {userRouter} = require("./route/user.route.js")

app.get("/",(req,res)=>{
    res.send("welcome to food delivery app")
})
app.use("/",userRouter)

app.listen(process.env.port,async()=>{

    try {
        await connection

        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }
    console.log(`listening on port ${process.env.port}`)
})