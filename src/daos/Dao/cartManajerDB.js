import mongoose from 'mongoose';
import cartsModel from '../models/cartModels.js';

class CartDaoManager {
    constructor(path) {
        this.path = path;
    }

    async getCartById(cid) {
        try {
            const cart = await cartsModel.findOne({ _id: cid }).lean();
            return cart;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async addCart() {
        try {
            const cart = await cartsModel.create({ products: [] });
            return cart;
        } catch (error) {
            console.error(error);
        }
    }

    async addProduct(cid, pid, quantity) {
        try {
            let cart = await cartsModel.findById(cid);
            if (!cart) {
                throw new Error('El carrito no existe');
            }

            const productId = new mongoose.Types.ObjectId(pid);
            const productIndex = cart.products.findIndex(item => item.product.equals(productId));

            if (productIndex === -1) {
                cart.products.push({ product: productId, quantity });
            } else {
                cart.products[productIndex].quantity += quantity;
            }

            await cart.save();
            await cartsModel.updateOne({ _id: cid }, { $set: cart });
            console.log('Carrito actualizado');
            return cart;
        } catch (error) {
            console.error(error);
        }
    }

    async updateCart(cartId, product, quantity = 1) {
        try {
            const result = await cartsModel.findOneAndUpdate(
                { _id: cartId, 'products.product': product },
                { $inc: { 'products.$.quantity': quantity } },
                { new: true }
            );

            if (result) return result;

            const newProductInCart = await cartsModel.findOneAndUpdate(
                { _id: cartId },
                { $push: { products: { product, quantity } } },
                { new: true }
            );

            return newProductInCart;
        } catch (error) {
            console.error("Error updating cart:", error);
            return { error: "Error updating cart" };
        }
    }

    async updateTodoCart(cid, products) {
        try {
            let cart = await cartsModel.findById(cid);
            if (!cart) {
                throw new Error('El carrito no existe');
            }

            products.forEach(({ product, quantity }) => {
                const productId = new mongoose.Types.ObjectId(product);
                const productIndex = cart.products.findIndex(item => item.product.equals(productId));

                if (productIndex === -1) {
                    cart.products.push({ product: productId, quantity });
                } else {
                    cart.products[productIndex].quantity += quantity;
                }
            });

            await cart.save();
            await cartsModel.updateOne({ _id: cid }, { $set: cart });
            console.log('Carrito actualizado');
            return cart;
        } catch (error) {
            console.error("Error updating cart:", error);
            return { error: "Error updating cart" };
        }
    }

    async deleteProduct(cartId, productId) {
        try {
            const result = await cartsModel.updateOne(
                { _id: cartId },
                { $pull: { products: { product: productId } } },
                { new: true }
            );
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteTodosLosProducts(cartId) {
        try {
            const result = await cartsModel.updateOne(
                { _id: cartId },
                { $set: { products: [] } },
                { new: true }
            );
            return result;
        } catch (error) {
            console.error(error);
        }
    }
}

export default CartDaoManager;
