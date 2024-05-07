import Product from './models/productModels.js'

export default class ProductManager {
    async getProducts(limit) {
        return await Product.find().limit(limit);
    }

    async getProductById(productId) {
        return await Product.findById(productId);
    }

    async addProduct(product) {
        const newProduct = new Product(product);
        await newProduct.save();

    }

    async updateProduct(productId, product) {
        await Product.findByIdAndUpdate(productId, product);
    }

    async deleteProduct(productId) {
        await Product.findByIdAndDelete(productId);
    }

    async deleteAllProducts() {
        await Product.deleteMany({});
    }
}