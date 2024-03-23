import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { errorHandler } from "../utils/error.js"

export const signup = async(req,res,next)=>{
    const {username,email,password} = req.body

    if(!username || !password || !email || username === "" || password === "" || email === ""){
        return next(errorHandler(400,"All fields are required!"))
    }

    const hashedPassword = bcrypt.hashSync(req.body.password,10)

    const newUser = new User({
        username,
        email,
        password:hashedPassword
    })

    try {
        await newUser.save()
        res.status(200).send("Signup successfull")
    } catch (err) {
        next(err)
    }
}