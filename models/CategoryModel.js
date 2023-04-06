const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CategorySchema = new Schema({
    category_name: { type: String, required: true },
    category_desciption: { type: String, required: true },
    category_product: [{ type: Schema.Types.ObjectId, ref:"Product" }],
});

module.exports = mongoose.model('Category', CategorySchema);