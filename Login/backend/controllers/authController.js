import user from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const signup = async() =>{
    try{
       const {username, email, password, confirmPassword} = req.body;

    } catch(error){
        res.status(500).json({msg: 'server error'})
    }
}


export const login = async() =>{
    try{
        const {username, password} = req.body;

    } catch(error){
        res.status(500).json({msg:'server error'})
    }
}