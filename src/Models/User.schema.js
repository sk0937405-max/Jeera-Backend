const { default: mongoose } = require("mongoose")
const Mongoose = require("mongoose")
const validator = require("validator")
const { default: isEmail } = require("validator/lib/isEmail")



const UserSchema = new Mongoose.Schema({
  name :{
    type : String,
    required : true,
    trim : true,
    minLength : 2,
    maxLength : 30,
    immutable :true,
    unique:true
  },
  password :{
    type : String,
    required :true
  },
  email : {
    type: String,
    validate : {
      message : "{VALUE} is not a valid email",
      validator : (info)=>{
        return validator.isEmail(info)
      }
    },
    required : true,
    immutable : true,
    trim : true,
    unique : true
  },
  role : {
    type : String,
    enum : {
      values : ["admin","owner","employee"],
      message : "{VALUE} is not a valid role"
    },
    required :true,
    trim : true
  },
  organizationId : String,
  teamId : String,
  isActive : {
    type : Boolean,
    default : true
  }
},{
  timestamps : true

})


const User = mongoose.model("User",UserSchema)


module.exports ={
   User
}