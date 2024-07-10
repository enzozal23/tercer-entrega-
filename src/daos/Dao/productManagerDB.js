import Product from '../models/productModels.js'



class ProductManager {
    constructor() {
        this.productsModel = Product;
    }

    getTodosProducts = async () => {
        try {
            const products = await this.productsModel.find()
            return products
        } catch (error) {
            console.log(error)
            return []
        }
    }



    getProduct = async ({ limit = 10, pageNum = 1, sortByPrice, category, status, title } = {}) => {
        try {
            let query = {};
            if (category) {
                query.category = category;
            }
            if (status) {
                query.status = status;
            }
            if (title) {
                query.title = title;
            }

            let toSortedByPrice = {};
            if (sortByPrice) {
                toSortedByPrice = { price: parseInt(sortByPrice, 10) };
            }


            const validLimit = Number.isInteger(limit) ? limit : 10;
            const validPageNum = Number.isInteger(pageNum) ? pageNum : 1;

            return await this.productsModel.paginate({ query }, { limit: validLimit, page: validPageNum, lean: true, sort: toSortedByPrice });
        } catch (error) {
            console.error("Error in getProducts:", error);
            throw error;
        }
    };

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