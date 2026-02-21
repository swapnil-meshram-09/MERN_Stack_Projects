import mongoose from 'mongoose'

async function connectDB(){
    try{
        await mongoose.coonect(process.env.MONGODB_URI)
    }catch(error){
        console.error(error.message)
        process.exit(1)
    }
}