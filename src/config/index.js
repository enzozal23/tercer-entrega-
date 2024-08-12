import dotenv from 'dotenv'
import { program } from '../utils/commander.js'
import jwt from 'jsonwebtoken'
import { connect } from 'mongoose'
import { MongoSingleton } from './mongoSingleton.js'
const { mode } = program.opts()

dotenv.config({
    path: mode === 'production' ? './.env.production' : './.env.development'
})
const PORT = process.env.PORT || 8080
export const objectConfig = {
    port: process.env.PORT || 8080,
    mongo_url: process.env.MONGO_URL,
    private_key: process.env.PRIVATE_KEY,
    user_admin: process.env.USER_ADMIN,
    user_pass: process.env.USER_PASS,
    gmail_user: process.env.GMAIL_USER,
    gmail_pass: process.env.GMAIL_PASS
}
export const connectDB = () => {
    MongoSingleton.getInstance(objectConfig.mongo_url)
}
export const generateToken = (user) => jwt.sign(user, process.env.PRIVATE_KEY, { expiresIn: '1d' })