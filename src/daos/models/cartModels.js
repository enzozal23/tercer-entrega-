import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, required: true },
});

const cartSchema = new Schema({
  products: [productSchema],
  total: Number,
});

const Cart = model('Cart', cartSchema);

export default Cart;
