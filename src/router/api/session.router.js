import { Router } from "express";
import passport from "passport";
import { passportCall } from "../../middlewares/passportCall.middleware.js";
import { authorization } from "../../middlewares/authorization.middleware.js";
import SessionsController from "../../controllers/sessionCtrls.js";

const router = Router()
const {
    githubSessions,
    githubCallSessions,
    emailSessions,
    registerSessions,
    loginSessions,
    failRegisterSessions,
    failLoginSessions,
    currentSessions,
    logoutSessions
} = new SessionsController()

router.get('/github', passport.authenticate('github', { scope: 'user:email' }), githubSessions)
router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), githubCallSessions)
router.get('/email', emailSessions)
router.post('/register', registerSessions)
router.post('/login', loginSessions)
router.post('/failregister', failRegisterSessions)
router.post('/faillogin', failLoginSessions)
router.get('/current', passportCall('jwt'), authorization('admin'), currentSessions)
router.get('/currentUser', passportCall('jwt'), authorization('user'))
router.get('/logout', logoutSessions)



export default router