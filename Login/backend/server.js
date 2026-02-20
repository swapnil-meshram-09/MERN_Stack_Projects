import express from 'express'
import mongoose from 'mongoose'

const app = express()

mongoose.connect(process.env.MONGODB_URI)
.then(() =>{
    console.log('MONGODB Connected Successfully.');
    
})
.catch(() =>{
    console.log(error);
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port: ${process.env.PORT}`);
})