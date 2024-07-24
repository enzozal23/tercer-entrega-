import { CustomError } from "../service/errors/CustomError.js"
import { EError } from "../service/errors/enums.js"
import { generateProductError } from "../service/errors/info.js"
import { productService } from "../service/index.js"
import { logger } from "../utils/logger.js"

class ProductController {
    constructor() {
        this.service = productService
    }

    getProducts = async (req, res) => {
        try {
            const products = await this.service.getProducts()
            res.send({ status: 'success', payload: products })
        } catch (error) {
            logger.error(error)
        }

    }

    getProduct = async (req, res) => {
        try {
            const { pid } = req.params
            const result = await this.service.getProductById(pid)
            res.send({ status: 'success', payload: result })
        } catch (error) {
            logger.error(error)
        }
    }

    createProduct = async (req, res, next) => {
        try {
            const { title, description, price, thumbnail, code, stock, category } = req.body
            if (!title || !description || !price || !code || !stock || !category) {
                CustomError.createError({
                    name: 'Error al crear un producto',
                    cause: generateProductError({ title, description, price, code, stock, category }),
                    message: 'Faltan datos para crear el producto',
                    code: EError.INVALID_TYPES_ERROR
                })
            }
            const result = await this.service.createProduct(req.body)
            res.send({ status: 'success', payload: result })
        } catch (error) {
            next(error)
        }
    }

    updateProduct = async (req, res, next) => {
        try {
            const { pid } = req.params
            const { title, description, price, thumbnail, code, stock, category } = req.body
            if (!title || !description || !price || !code || !stock || !category) {
                CustomError.createError({
                    name: 'Error al actualizar un producto',
                    cause: generateProductError({ title, description, price, code, stock, category }),
                    message: 'Faltan datos para actualizar el producto',
                    code: EError.INVALID_TYPES_ERROR
                })
            }
            const result = await this.service.updateProduct(pid, { title, description, price, thumbnail, code, stock, category })
            res.send({ status: 'success', payload: result })
        } catch (error) {
            next(error)
        }
    }

    deleteProduct = async (req, res) => {
        try {
            const { pid } = req.params
            const result = await this.service.deleteProduct(pid)
            res.send({ status: 'success', payload: result })
        } catch (error) {
            logger.error(error)
        }
    }
}

export default ProductController