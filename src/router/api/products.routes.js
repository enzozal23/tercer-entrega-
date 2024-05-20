import express from 'express'
import {
    getProductById,
    addProduct,
    updateProduct,
    getProducts,
    deleteProduct,

} from '../../controllers/productCtrls.js'

const router = express.Router()

router.get('/', getProducts)
router.get('/:pid', getProductById)
router.post('/', addProduct)
router.put('/:pid', updateProduct)
router.delete('/:pid', deleteProduct)


export default router