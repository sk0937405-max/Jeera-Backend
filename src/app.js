require("dotenv").config()
const express = require("express")
const { default: mongoose } = require("mongoose")
const Mongoose = require("mongoose")
const { AddOwner } = require("./Utils/AddOwner")
const cp = require("cookie-parser")
const { UserRouter } = require("./Routes/UserAuth")
const cors = require("cors")


const app = express()
app.use(cors())

Mongoose.connect(process.env.DB_URL).then(()=>{
  console.log("DataBase Connected")
  // AddOwner("Sk","a@gamil.com","hello")
  app.use(express.json())
  app.use(cp())   
  app.use("/api/auth",UserRouter)
  const port = process.env.port
  app.listen(port , ()=>{
    console.log(`server runing on port ${port}`)
  })
}).catch((error)=>{
  console.log(`Database connection Failed ${error.message});
  }`)
})


app.use((err , req,res,next)=>{
  res.status(err.status).json({
    message : err.message
  })
})