import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signup = async(req,res)=>{
    const {username,email,password} = req.body

    if(!username || !password || !email || username === "" || password === "" || email === ""){
        return res.status(400).send("All fields are required!")
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
        res.status(500).send(err)
    }
}