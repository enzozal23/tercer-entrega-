export default class ProductRepository {
    constructor(productDao) {
        this.productDao = productDao
    }

    getProducts = async () => await this.productDao.getTodosProducts()
    getProduct = async (filter) => await this.productDao.getProduct(filter)
    getProductById = async (pid) => await this.productDao.getProductById(pid)
    createProduct = async (newProduct) => await this.productDao.addProduct(newProduct)
    updateProduct = async (pid, productToUpdate) => await this.productDao.updateProduct(pid, productToUpdate)
    deleteProduct = async (pid) => await this.productDao.deleteProduct(pid)
}