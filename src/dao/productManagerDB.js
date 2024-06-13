import Product from './models/productModels.js'



class ProductManager {
    constructor() {
        this.productsModel = Product;
    }

    getProducts = async ({ limit = 10, pageNum = 1, sortByPrice, category, status, title }) => {
        let query = {}
        if (category) {
            query.category = category;
        }
        if (status) {
            query.status = status;
        }
        if (title) {
            query.title = title;
        }

        let toSortedByPrice = {}
        if (sortByPrice) {
            toSortedByPrice = { price: parseInt(sortByPrice, 10) }
        }

        return await this.productsModel.paginate(query, { limit: limit, page: pageNum, lean: true, sort: toSortedByPrice });
    }

    addProduct = async ({ title, description, code, price, status, stock, category }) => {
        const newProduct = {
            title: title,
            description: description,
            code: code,
            price: price,
            status: status,
            stock: stock,
            category: category,

        }
        try {
            return await this.productsModel.collection.insertOne(newProduct);

        } catch (error) {
            throw error
        }
    }
    getProductsById = async (productId) => {
        return await this.productsModel.findOne({ _id: productId }).lean();
    }
    updateProduct = async (productId, updatedProduct) => {
        return await this.productsModel.updateOne({ _id: productId }, { $set: updatedProduct });
    }
    deleteProduct = async (productId) => {
        return await this.productsModel.deleteOne({ _id: productId });
    }


}

export default ProductManager;