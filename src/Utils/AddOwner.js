const bcrypt = require("bcrypt")
const { User } = require("../Models/User.schema")


const AddOwner =(name , email , password)=>{
   bcrypt.hash("helloBhai",10).then((data)=>{
  User.create({
    name,
    email ,
    password ,
    role : "owner"

  })
})

}

module.exports = {AddOwner}