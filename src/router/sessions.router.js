// session-> login-register-logout
import { Router } from "express";
import { UsersManagerMongo } from '../dao/userManagerDB.js'
import { auth } from "../middlewares/auth.middleware.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import passport from "passport";

const router = Router()
const userService = new UsersManagerMongo()

router.get('/github', passport.authenticate('github', { scope: 'user:email' }), async (req, res) => { })

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    req.session.user = req.user
    res.redirect('/realTimeProducts')
})

router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), async (req, res) => {
    res.send({ status: 'success', message: 'usuario registrado' })
})
router.post('/failregister', async (req, res) => {
    console.log('fallo el registro')
    res.send({ status: 'error', error: 'fallo el registro' })
})

    router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), async (req, res) => {
        if (!req.user) return res.status(400).send({ status: 'error', error: 'credencial invalida' })
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email
        }

        res.send({ status: 'success', payload: req.user })
    })



    router.post('/faillogin', (req, res) => {
        res.send({ error: 'fallo el login' })
    })




    router.get('/current', auth, (req, res) => {
        res.send('datos sensibles')
    })

    router.get('/logout', (req, res) => {
        req.session.destroy(err => {
            if (!err) return res.render('login')
            else return res.send({ status: 'Error', error: err })
        })
    })


    export default router

// router.post('/register', async(req, res) => {
//     try{
//         const{email, password, first_name, last_name} = req.body
//         if(!email || !password || !first_name || !last_name) return res.send({status:'error', error:'faltan datos, completar campos'})
//         const userExist = await userService.getUserBy({email})
//         if(userExist) return res.send({status:'error', error:'usuario ya existe'})
        
//         let newUser= {}
//         if(email === 'adminCoder@coder.com' || password === 'adminCod3r123') {
//             newUser = {
//                 first_name,
//                 last_name,
//                 email,
//                 password: createHash(password),
//                 role:'admin'
//             }
//         }else{
//             newUser = {
//                 first_name,
//                 last_name,
//                 email,
//                 password: createHash(password)
//             }
//         }
                
//         const result = await userService.createUser(newUser)
//         res.send('Usuario registrado')

//     } catch (error){
//         console.log(error)
//     }
    
// })

// router.post('/login', async  (req, res) => {
//     const{email, password} = req.body
//     if(!email || !password) return res.send({status:'error', error:'faltan datos, completar campos'})
//     const result = await userService.getUserBy({email})
//     if(!result) return res.status(401).send({status:'error', error:'Usuario incorrecto'})
    
//     if(!isValidPassword(password, {password :result.password})) return res.status(401).send({status:'error', error:'password incorrecto'})
//     req.session.user = {
//         nombre : result.first_name,
//         email,
//         admin: result.role === 'admin'
//     }
//     res.redirect('/products')
// })