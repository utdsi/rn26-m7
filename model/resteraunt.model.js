const mongoose  = require("mongoose")



const resSchema = mongoose.Schema({
    name: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String
  },
  menu: [{
    
    name: String,
    description: String,
    price: Number,
    image: String
  }]
})


const ResModel = mongoose.model("rest",resSchema)

const menuSchema = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String

})

const MenuModel = mongoose.model("menu",menuSchema)


module.exports = {ResModel,MenuModel}