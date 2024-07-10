import { Router } from 'express'
import ProductController from '../../controllers/productCtrls.js'
import { authorization } from '../../middlewares/authorization.middleware.js'
import { passportCall } from '../../middlewares/passportCall.middleware.js'


const router = Router()
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = new ProductController()

router.get('/', getProducts)
router.get('/:pid', getProduct)
router.post('/', passportCall('jwt'), authorization('admin'), createProduct)
router.put('/:pid', passportCall('jwt'), authorization('admin'), updateProduct)
router.delete('/:pid', passportCall('jwt'), authorization('admin'), deleteProduct)

export default router