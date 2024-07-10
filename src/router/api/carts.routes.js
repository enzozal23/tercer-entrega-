import { Router } from "express";
import CartController from "../../controllers/cartCtrls.js";
import { authorization } from '../../middlewares/authorization.middleware.js'
import { passportCall } from '../../middlewares/passportCall.middleware.js'

const router = Router()
const { getCart, createCart, addProductCart, updateCart, updateProductCart, deleteProductCart, deleteCart, buyCart } = new CartController

router.get('/:cid', getCart)
router.post('/', createCart)
router.post('/:cid/product/:pid', passportCall('jwt'), authorization('user'), addProductCart)
router.put('/:cid', updateCart)
router.put('/:cid/product/:pid', updateProductCart)
router.delete('/:cid/product/:pid', deleteProductCart)
router.delete('/:cid/', deleteCart)
router.put('/:cid/purchase', buyCart)

export default router