import { model, Schema } from "mongoose";

import mongoosePaginate from 'mongoose-paginate-v2'

const productSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    code: {
        type: String,
        unique: true,
        require: true
    },
    stock: Number,
    category: {
        type: String,
        enum: ['gpu', 'cpu', 'ram', 'ssd', 'fuentes', 'gabinetes']
    },
    status: Boolean

});
productSchema.plugin(mongoosePaginate)

const Product = model('products', productSchema);
export default Product;