import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
  products: Schema.Types.ObjectId,
  quantity: Number,
  price: Number,
  total: Number,
});

const Cart = model('Cart', cartSchema);

export default Cart;