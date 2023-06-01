const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config()


const userRouter = express.Router()

const {UserModel}  = require("../model/user.model.js")


userRouter.post("/api/register",async(req,res)=>{

    let {name,email,password,address}= req.body

   

    bcrypt.hash(password, 6, async function(err, hash) {
        // Store hash in your password DB.
        if(err){
            res.send(err)
        }else{
            const user =  new UserModel({name,email,password:hash,address})
            await user.save()
            res.send("signup successful")
        }
    });


})

userRouter.post("/api/login",async (req,res)=>{

    const {email,password} = req.body

    const user = await UserModel.findOne({email})

    if(user){

        const hash_password = user.password
        bcrypt.compare(password, hash_password, function(err, result) {
            // result == false
            if(result){
    
                const token = jwt.sign({ "Userid" :user._id}, process.env.pass);
    
                res.send({"msg":"login successfull","token":token})
            }
        });
    }

    
})



userRouter.patch("/api/user/:id/reset",async(req,res)=>{


    const id = req.params.id

    

    const {new_password}= req.body

    bcrypt.hash(new_password, 6,async function(err, hash) {
        // Store hash in your password DB.

        if(err){
            res.send(err)
        }else{

            let payload = {password:hash}
            await UserModel.findByIdAndUpdate({_id:id},payload)
            res.send("password updated success")
        }
    });
    
})

module.exports = {userRouter}