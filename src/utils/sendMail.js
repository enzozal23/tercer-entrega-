import nodemailer from 'nodemailer'
import { objectConfig } from '../config/index.js'

const { gmail_pass, gmail_user } = objectConfig

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: gmail_user,
        pass: gmail_pass
    }
})
export const sendEmail = async ({ email, subject, html }) => {
    return await transport.sendMail({
        from: 'Coder Test <enzo.z.1.ez@gmail.com>',
        to: gmail_user,
        subject,
        html

    })
}