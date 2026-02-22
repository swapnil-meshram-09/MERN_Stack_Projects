import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'

dotenv.config()

const app = express()
connectDB()

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)

app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port: ${process.env.PORT}`);
})