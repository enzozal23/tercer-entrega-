import express from 'express'
import {
    createCart,
    getCartById,
    addProductToCart,
    removeProductFromCart,
    deleteCart,
} from '../../controllers/cartCtrls.js'

const router = express.Router()

router.post('/', createCart)
router.get('/:cid', getCartById)
router.post('/:cid/products/:pid', addProductToCart)
router.delete('/:cid/products/:pid', removeProductFromCart)
router.delete('/:cid', deleteCart)

export default router