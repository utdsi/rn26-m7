
const express = require("express")

const app = express()

app.use(express.json())
require('dotenv').config()

const {}  = require("./config/db.js")
const { connection } = require("mongoose")

app.get("/",(req,res)=>{
    res.send("welcome to food delivery app")
})

app.listen(process.env.port,async()=>{

    try {
        await connection

        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }
    console.log(`listening on port ${process.env.port}`)
})