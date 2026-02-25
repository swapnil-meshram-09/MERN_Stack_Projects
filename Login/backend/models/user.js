import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
        },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
        },
    password:{
        type: String,
        required: true,
        length: 15
        }
    }, 
    {timestamps: true})

const User = mongoose.model('user', userSchema) 

export default User