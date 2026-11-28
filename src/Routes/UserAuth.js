
const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { User } = require("../Models/User.schema");
const jwt = require("jsonwebtoken");
const { AppError } = require("../Utils/AppError");
const {isLogedIn}= require("../Middlewares/isLogedIn")

const router = express.Router();


router.post("/signin", async (req, res) => {
    try {
        const { name, role, password, email } = req.body;

        if (!validator.isStrongPassword(password)) {
            throw new Error("Please Enter Strong password");
        }

        if (!name) {
            throw new Error("Please Enter Valid Name");
        }

        if (!role) {
            throw new Error("Please Enter Valid Role");
        }

        if (!email) {
            throw new Error("Please Enter Valid Email");
        }

        if (!password) {
            throw new Error("Please Enter Valid Password");
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const CreateUser = await User.create({
            name,
            role,
            password: hashPassword,
            email
        });

        res.status(201).json({
            msg: "User Created Successfully",
            data: CreateUser
        });

    } catch (error) {
        res.status(400).json({
            err: error.message
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { name, role, email, password } = req.body;

        if (!email || !password) {
            throw new AppError(400, "Testing My Error");
        }

        const foundUser = await User.findOne({ email });

        if (!foundUser) {
            throw new AppError(404, "User does't Exists...");
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            foundUser.password
        );

        if (!isPasswordCorrect) {
            throw new Error("Invalid Credentials");
        }

        const token = await jwt.sign(
            { id: foundUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );

        res.status(200).cookie("token",token,{
          maxAge : 24*60*60*1000,
          httpOnly : true,
          sameSite : "strict",
          // secure : true

        }).json({
            msg: "User Logged in",
            data: foundUser
        });

    } catch (error) {
        res.status(400).json({
            err: error.message
        });
    }
});

router.post("/logout", (req, res) => {
    // .cookie("token", null)
    res.clearCookie("token").json({
        msg: "User logged out"
    });
});


router.get("/me" , isLogedIn , async(req,res)=>{
  const {email ,name , isActive , role} = req.user
  res.json({
    message : "ok",
    data : {email ,name , isActive , role}
  })

})

module.exports = ({ UserRouter: router });
