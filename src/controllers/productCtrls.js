
import { productService } from "../service/index.js"

class ProductController {
    constructor() {
        this.service = productService
    }

    getProducts = async (req, res) => {
        try {
            const products = await this.service.getProducts()
            res.send({ status: 'success', payload: products })
        } catch (error) {
            console.log(error)
        }

    }

    getProduct = async (req, res) => {
        try {
            const { pid } = req.params
            const result = await this.service.getProductById(pid)
            res.send({ status: 'success', payload: result })
        } catch (error) {
            console.log(error)
        }
    }

    createProduct = async (req, res) => {
        try {
            const { title, description, price, thumbnail, code, stock, category } = req.body
            if (!title || !description || !price || !code || !stock || !category) return res.send({ status: 'error', error: 'faltan datos' })
            const result = await this.service.createProduct(req.body)

            res.send({ status: 'success', payload: result })
        } catch (error) {
            console.log(error)
        }
    }

    updateProduct = async (req, res) => {
        try {
            const { pid } = req.params
            const { title, description, price, thumbnail, code, stock, category } = req.body
            if (!title || !description || !price || !code || !stock || !category) return res.send({ status: 'error', error: 'faltan datos' })

            const result = await this.service.updateProduct(pid, { title, description, price, thumbnail, code, stock, category })
            res.send({ status: 'success', payload: result })
        } catch (error) {
            console.log(error)
        }
    }

    deleteProduct = async (req, res) => {
        try {
            const { pid } = req.params
            const result = await this.service.deleteProduct(pid)
            res.send({ status: 'success', payload: result })
        } catch (error) {
            console.log(error)
        }
    }
}

export default ProductController