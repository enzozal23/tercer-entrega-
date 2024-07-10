import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";

const router = Router()

// endpoint para cookie 
router.get('/setCookie', (req, res) => {
    res.cookie('cookie', 'Unacookie poderosa', { maxAge: 10000000000, signed: true }).send('cookie signed')
})
router.get('/getCookie', (req, res) => {
    res.send(req.signedCookies)
})
router.get('/deleteCookie', (req, res) => {
    res.clearCookie('cookie').send('cookie borrada')
})
// endpoint para session 
router.get('/current', auth, (req, res) => {
    res.send('datos sensibles que solo ve el administrador')
})
router.get('/session', (req, res) => {
    if (req.session.counter) {
        req.session.counter++
        res.send(`Veces visitado: ${req.session.counter}`)
    } else {
        req.session.counter = 1
        res.send('Bienvenido')
    }
})
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (!err) return res.send('session destruida')
        else return res.send({ status: 'Error', error: err })
    })
})
export default router