const Model_category = require('../models/CategoryModel');
const Model_product = require('../models/ProductModel');

//get all
const getAll = async()=>{
    try {
        const getAll = await Model_product.find({});
        return getAll;
      } catch (error) {
        console.log("error get all product: " + error);
      }
}

//add product
const addProduct = async( product_code, product_name, product_img, product_price, product_category )=>{
  try {
    const add = new Model_product( {product_code, product_name, product_img, product_price, product_category} );
    await add.save();
    if(product_category){
      const ctgr = Model_category.find({ _id: product_category });
      await ctgr.updateOne({ $push: { category_product: add._id } });
    }
    // return add;
  } catch (error) {
    console.log("error add product: " + error);
    
  }
};

//get detail product
const getDetailProduct =async(_id)=>{
  try {
    const getdetail = await Model_product.findById(_id).populate(
      "product_category"
    );
    return getdetail;
  } catch (error) {
    console.log("error get detail product: " + error);
  }
}

//update product
const updateProduct = async(_id, product_name, product_img, product_price, product_category )=>{
  try {
    const update= await Model_product.findById(_id);
    const udproduct = await Model_product.findByIdAndUpdate(_id,
      {
        product_name: product_name,
        product_img: product_img,
        product_price: product_price,
        product_category: product_category,
      }
    );
    return udproduct;
} catch (error) {
    console.error("error update book: "+error);
}
}

//delete product
const deleteProduct = async (_id)=>{
  try {
    await Model_product.findByIdAndDelete(_id);
  
  } catch (error) {
    console.error("error delete book: "+error);
    
  }
}

module.exports = { getAll, addProduct, getDetailProduct, updateProduct, deleteProduct };
