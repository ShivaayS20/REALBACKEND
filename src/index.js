//equire('dotenv').config(path: './env')

/*import mongoose from "mongoose";
import { DB_NAME } from "./constants"; */
import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})

import connectDB from "./db/index.js"
import { app } from "./app.js";

connectDB()
.then(() => {
        app.on("error",(error)=>{
            console.log("error: ", error);
                    throw error
        });

    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server is running at : ${process.env.PORT}`);
    });

}).catch((err) => {
    console.log("mongo db fsiler!!!",err)
});



















/*

import express from "express";
 const app= express()

(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("error: ", error);
                    throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log("app is litening  on port ${process.env.PORT}")
        })

    } catch (error) {
        console.error("ERROR: ",error)
        throw err
    }
})()  
    
*/