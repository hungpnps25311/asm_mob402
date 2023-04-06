const Model_category = require('../models/CategoryModel');
const Model_product = require('../models/ProductModel');

//get all
const getAll = async ()=>{
    try {
      const getAll = await Model_category.find({});
      return getAll;
    } catch (error) {
      console.log("error get all category" + error);
    }
}

//add category
const addCategory = async (category_name, category_desciption)=>{
  try {
    const newCategory = new Model_category({category_name, category_desciption});
    const addCategory = await newCategory.save();
    // if (category_product) {
    //   const category = Model_category.find({ _id: category_product });
    //   await category.updateOne({ $push: { product_category: addCategory._id } });
    // }
  } catch (error) {
    console.log("error add category: " + error);
  }
};

//update category
const updateCategory = async(_id, category_name, category_desciption, category_product)=>{
  try {
    const update = await Model_category.findById(_id);
    await Model_category.findByIdAndUpdate(_id,{
      category_name:category_name,
      category_desciption:category_desciption,
      category_product:category_product
    });
} catch (error) {
    console.error("error update category: "+error);
}
}

//get detail category
const getDetailCategory = async(_id)=>{
  try {
    const getdetailBook = await Model_category.findById(_id).populate(
      "category_product"
    );
    return getdetailBook;
  } catch (error) {
    console.log("error get detail author: " + error);
  }
}

//delete category
const deleteCategory = async(_id)=>{
  try {
    await Model_product.updateMany(
    {product_category:_id},
    {$pull: {product_category:_id}}
);
await Model_category.findByIdAndDelete(_id);
} catch (error) {
    console.log("error delete book: "+error);
}
}


module.exports = { getAll, addCategory, updateCategory, getDetailCategory, deleteCategory };
