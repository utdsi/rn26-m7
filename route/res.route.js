const express = require("express")

const resRouter = express.Router()

const { ResModel, MenuModel } = require("../model/resteraunt.model.js")


resRouter.get("/api/restaurants", async (req, res) => {


    let resteraunt = await ResModel.find()

    res.send(resteraunt)
})


resRouter.get("/api/restaurants/:id", async (req, res) => {

    let id = req.params.id

    let resteraunt = await ResModel.find({ _id: id })

    res.send(resteraunt)

})

resRouter.get("/api/restaurants/:id/menu", async (req, res) => {


    let resteraunt = await ResModel.find({ _id: req.params.id })

    res.send(resteraunt.menu)
})

resRouter.post("/api/restaurants/:id/menu", async (req, res) => {

    const { name, description, price, image } = req.body


    const menu = new MenuModel({name,description,price,image})
    await menu.save()

    let resteraunt = await ResModel.findOne({_id:req.params.id})

    resteraunt.menu.push(menu)

await ResModel.findByIdAndUpdate({_id:req.params.id},resteraunt)
//console.log(resteraunt.menu)

    res.send("menu created success")



})

resRouter.delete("/api/restaurants/:id/menu/:menuid",async(req,res)=>{

    let id = req.params.id

    let menuid = req.params.menuid

    let resteraunt = await ResModel.findOne({_id:id})

   // console.log(resteraunt.menu)


    for(let i=0;i<resteraunt.menu.length;i++){

        if(resteraunt.menu[i]._id==menuid){

            resteraunt.menu.splice(i,1)

        }
    }


    await ResModel.findByIdAndUpdate({_id:id},resteraunt)


    res.send("menu deleted succesfully")








})


resRouter.post("/addRes",async(req,res)=>{


    const {name,address,menu}  = req.body


    let resteraunt = new ResModel({name,address,menu})
    //console.log(resteraunt)

    await resteraunt.save()

    res.send("resteraunt created")

})

module.exports = {resRouter}