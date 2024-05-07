import Cart from './models/cart.model.js';

export default class CartManager {
    async createCart() {
        const cart = new Cart();
        await cart.save();
        return cart;
    }

    async getCart() {
        return await Cart.find();
    }

    async getCartById(cid) {
        return await Cart.findById(cid);
    }

    async addToCart(cid, pid) {
        const cartItem = new Cart({ cartId: cid, productId: pid });
        await cartItem.save();
    }
    async updateCartItem(cartItemId, item) {
        await Cart.findByIdAndUpdate(cartItemId, item);
    }

    async deleteCartItem(cartItemId) {
        await Cart.findByIdAndDelete(cartItemId);
    }

    async clearCart() {
        await Cart.deleteMany({});
    }
}