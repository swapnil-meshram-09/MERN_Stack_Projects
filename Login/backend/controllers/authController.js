import User from './models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const signup = async() =>{
    try{
       const {username, email, password, confirmPassword} = req.body;

       if(password !== confirmPassword){
        return res.status(400).json({msg: 'Password do not match.'})
       }

       const existingUser = await User.findOne({
        $or: [{username} || {email}]
       });

       if(existingUser){
        return res.status(400).json({msg: 'User already exist'})
       }

       const hashedPassword = await bcrypt.hash(password, 10)

       const user = await User.create({
        username, 
        email,
        password: hashedPassword
       });

    } catch(error){
        res.status(500).json({msg: 'server error'})
    }
}



export const login = async() =>{
    try{
        const {username, password} = req.body;

        const user = await User.findOne({
            $or: [{username: username} || {email: username}]
        })

        if(!user){
            return res.status(404).json({msg: 'User not found.'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(404).json({msg: 'Password does not match.'})
        }
    } catch(error){
        res.status(500).json({msg:'server error'})
    }
}