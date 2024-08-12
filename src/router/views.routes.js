

import { Router } from 'express'
// import ProductDao from '../daos/Dao/ProductDao.js'
import { Server } from 'socket.io';
import ProductMongoManager from '../daos/Dao/productManagerDB.js';
import CartMongoDao from '../daos/Dao/cartManajerDB.js'
import { authorization } from '../middlewares/authorization.middleware.js';
import { passportCall } from '../middlewares/passportCall.middleware.js';
import { generarProducts } from '../utils/generarProducts.js';
import { logger } from '../utils/logger.js';

const productService = new ProductMongoManager
const cartService = new CartMongoDao



const router = Router()

const products = []



// endpoint en ruta raíz
router.get('/', (req, res) => {
    res.render('home', {

        role: 'admin',
        products
    })
})

router.get('/products', async (req, res) => {
    const { limit, numPage, sort, query } = req.query
    const { docs, page, hasPrevPage, hasNextPage, prevPage, nextPage } = await productService.getProduct({ limit, numPage, sort, query })
    const userNombre = req.session.user && req.session.user.nombre ? req.session.user.nombre : '';
    const userExist = req.session.user ? true : false;
    res.render('products', {
        products: docs,
        page,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        user: userNombre,
        userExist
    });

})
router.get('/mockingproducts', async (req, res) => {
    const { limit, numPage, sort, query } = req.query
    let products = []
    for (let i = 0; i < 100; i++) {
        products.push(generarProducts())
    }
    const userNombre = req.session.user && req.session.user.nombre ? req.session.user.nombre : '';
    const userExist = req.session.user ? true : false;
    res.render('mockingproducts', {
        products,
        user: userNombre,
        userExist
    });
})
router.get('/chat', passportCall('jwt'), authorization('user'), (req, res) => {
    res.render('chat')
})
router.get('/carts/:cid', async (req, res) => {
    const { cid } = req.params
    const { carts } = await cartService.getCartById(cid)
    logger.info(carts)

    res.render('carts', {
        carts, cid
    })
})
router.get('/login', (req, res) => {
    res.render('login')
})
router.get('/register', (req, res) => {
    res.render('register')
})
export default router