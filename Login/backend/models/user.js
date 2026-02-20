import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    name: {
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
        require: true,
        unique: true,
        length: 15
        }
    }, 
    {timestamps: true})

export default user = mongoose.Model('user', schema) 