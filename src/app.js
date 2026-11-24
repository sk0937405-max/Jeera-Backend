require("dotenv").config()
const express = require("express")
const { default: mongoose } = require("mongoose")
const Mongoose = require("mongoose")
const { AddOwner } = require("./Utils/AddOwner")
AddOwner

const app = express()

Mongoose.connect(process.env.DB_URL).then(()=>{
  console.log("DataBase Connected")
  // AddOwner("Sk","a@gamil.com","hello")
  const port = process.env.port
  app.listen(port , ()=>{
    console.log(`server runing on port ${port}`)
  })
}).catch((error)=>{
  console.log(`Database connection Failed ${error.message});
  }`)
})