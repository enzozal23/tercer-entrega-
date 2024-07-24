import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import {fork} from 'child_process'
import { sendEmail } from "../../utils/sendMail.js";
import UserCurrentDto from "../../dtos/usersCurrent.dto.js";
import { authorization } from "../../middlewares/authorization.middleware.js";
import { logger } from "../../utils/logger.js";

const router = Router()

// function operacioncompleja() {
//     let result = 0
//     for (let i = 0; i > 10e1; 1++){
//         result += 1
//     }
//     return result
// }
router.get('/loggerTest', (req, res) =>{
    req.logger.fatal('Fatal!!')
    req.logger.error('Error!!')
    req.logger.warning('Alerta!!')
    req.logger.info('Informacion!!')
    req.logger.http('http!!')
    req.logger.debug('debug!!')
    res.send('Logs')
})
router.get('/suma', (req, res) =>{
    const result = operacioncompleja()
    res.send({result})
})
router.get('/simple', (req, res) =>{
    const child = fork('./src/routes/api/operacioncompleja.js')
    child.send('inicia el calculo')
    child.on('message', result =>{
        res.send({result})
    })
})
// endpoint para cookie 
router.get('/setCookie', (req, res) => {
    res.cookie('cookie', 'Unacookie poderosa',{maxAge:10000000000, signed:true}).send('cookie signed')
})
router.get('/getCookie', (req, res) => {
    res.send(req.signedCookies)
})
router.get('/deleteCookie', (req, res) => {
    res.clearCookie('cookie').send('cookie borrada')
})
// endpoint para session 

router.get('/session', (req, res) => {
    if(req.session.counter){
        req.session.counter++
        res.send(`Veces visitado: ${req.session.counter}`)
    }else{
        req.session.counter = 1
        res.send('Bienvenido')
    }
})
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(!err) return res.send('session destruida')
        else return res.send({status:'Error', error:err})
    })
})
router.get ('/mail', async (req, res)=>{
    try {
        const user = {
            first_name :'Agus',
            last_name :'Desinano',
            email :'agustinadesinano@gmail.com',
        }
        sendEmail({
            email: user.email,
            subject: 'Email de prueba',
            html: `Bienvenido ${user.first_name} ${user.last_name}`
        })
    } catch (error) {
        logger.error(error)
    }
    
    res.send('enviado')
})
export default router