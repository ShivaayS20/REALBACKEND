import express, { json } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))

app.use(express.urlencoded({extended:true,limit:"16kb"}))
 
app.use(express.static("public")) //public-->forlder name where i can store pdf,file,photo in my server and i also made a server name public

app.use(cookieParser())

//routes import
import userRouter from './routes/user.routes.js'

//routes declaration
app.use("/api/v1/users",userRouter)  //standard practice

export { app }