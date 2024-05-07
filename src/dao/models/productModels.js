import { model, Schema } from "mongoose";



const productSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    code: String,
    stock: Number,


});
const Product = model('products', productSchema);
export default Product;