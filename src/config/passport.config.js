import { createHash, isValidPassword } from '../utils/bcrypt.js'
import passport from 'passport'
import local from 'passport-local'
import GithubStratetegy from 'passport-github2'
import { UsersManagerMongo } from '../dao/userManagerDB.js'

const userService = new UsersManagerMongo()
const LocalStrategy = local.Strategy
export const initializePassport = () => {
    // middleware -> estrategia -> local -> username(email), password
    passport.use('github', new GithubStratetegy({
        clientID: 'Iv23liOUwwEv5ArstMap',
        clientSecret: '0a64f1896719019fd9d5e42765b9d0db6ba83a49',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async (accesToken, refreshToken, profile, done) => {
        try {
            console.log(profile)
            let user = await userService.getUserBy({ email: profile._json.email })
            // no existe el usuario en nuestra base de datos
            if (!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: profile._json.name,
                    email: profile._json.email,
                    password: ''
                }
                let result = await userService.createUser(newUser)
                done(null, result)
            } else {
                done(null, user)
            }

        } catch (err) {
            return done(err)
        }
    }))


    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const { first_name, last_name } = req.body
        try {
            let userFound = await userService.getUserBy({ email: username })
            if (userFound) {
                console.log('el usuario ya existe')
                return done(null, false)
            }
            // crear el uusario 
            let newUser = {
                first_name,
                last_name,
                email: username,
                password: createHash(password)
            }
            let result = await userService.createUser(newUser) // _id
            return done(null, result)
        } catch (error) {
            return done('error al registrar el usuario ' + error)
        }
    }))


    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        try {
            const user = await userService.getUserBy({ email: username })
            if (!user) {
                console.log('usuario no encontrado')
                return done(null, false)
            }
            if (!isValidPassword(password, { password: user.password })) return done(null, false)
            return done(null, user) // req.user // password 
        } catch (error) {
            return done(error)
        }
    }))


    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userService.getUserBy({ _id: id })
            done(null, user)
        } catch (error) {
            done(error)
        }
    })
}