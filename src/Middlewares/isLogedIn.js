
const jwt = require("jsonwebtoken")
const validator = require("validator")
const { AppError } = require("../Utils/AppError")
const {User} = require("../Models/User.schema")

const isLogedIn =async (req,res,next)=>{
  const token = req.cookies.token
  console.log(token)

  if(!token){
    throw new AppError(400 ,"Please Loged In")
  }
  if(!validator.isJWT(token)){
    throw new AppError(400,"Please Provide a Valid Token")
  }

  const originalObject = jwt.verify(token,process.env.JWT_SECRET)
  console.log(originalObject)
  const foundUser = await User.findById(originalObject.id)

  if(!foundUser){
    throw new AppError(404 , "User Not Found")
  }

  req.user = foundUser

  next()


}

module.exports = {isLogedIn}