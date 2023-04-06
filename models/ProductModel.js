const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const ProductSchema = new Schema({
    product_code: { type: String, required: true },
    product_name: { type: String, required: true },
    product_img: { type: String, required: true},
    product_price: { type: Number, required: true, default:0},
    product_category : { type: Schema.Types.ObjectId,
        ref:"Category" },
});


module.exports = mongoose.model('Product', ProductSchema);
