import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

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

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        )

        res.json({msg: 'Login Successfully', token})

    } catch(error){
        res.status(500).json({msg:'server error'})
    }
}