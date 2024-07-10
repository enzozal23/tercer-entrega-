import { Router } from "express"
import sessionRouter from './api/session.router.js'
import pruebasRouter from './api/pruebas.js'
import productsRouter from './api/products.routes.js'
import cartsRoutes from './api/carts.routes.js'
import viewsRuter from './views.routes.js'


const router = Router()

router.use('/', viewsRuter)
router.use('/pruebas', pruebasRouter)
router.use('/api/products', productsRouter)
router.use('/api/carts', cartsRoutes)
router.use('/api/sessions', sessionRouter)

export default router