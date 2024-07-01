import dotenv from 'dotenv'
import { program } from '../utils/commander.js'
import jwt from 'jsonwebtoken'
import { connect } from 'mongoose'
  
const {mode} = program.opts()

dotenv.config({
    path: mode === 'production' ? './.env.production' : './.env.development'
})
const PORT = process.env.PORT ||8080
export const objectConfig = {
    port:             process.env.PORT ||8080,
    mongo_url:        process.env.MONGO_URL,
    private_key:      process.env.PRIVATE_KEY,
    user_admin:       process.env.USER_ADMIN,
    user_pass:        process.env.USER_PASS
} 
export const connectDB = () => {
    connect(process.env.MONGO_URL);
    console.log('DB connected');
};
export const generateToken = (user) => jwt.sign(user, process.env.PRIVATE_KEY, { expiresIn: '1d' })