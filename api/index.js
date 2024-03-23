import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors"
import userRoute from "./routes/user.route.js"
import authRoute from "./routes/auth.route.js"

const app = express()
dotenv.config()
app.use(express.json())

app.use(cors({origin:"http://localhost:5173",credentials:true}))


const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to MongoDB!");
    } catch (err) {
        console.log(err);
    }
}

app.use("/api/user",userRoute)
app.use("/api/auth",authRoute)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server error"
    res.status(statusCode).send({
        success:false,
        statusCode,
        message
    })
})

app.listen(3000,()=>{
    connect()
    console.log("Backend server is running!");
})