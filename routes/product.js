var express = require("express");
var router = express.Router();

const Controller_category = require("../controllers/Controller_category");
const Controller_product = require("../controllers/Controller_product");
const middleware = require("../middleware/upload");
const getConstants = require("../helpers/constants").getConstants;

/* GET home page. */
router.get("/add-product", async function (req, res, next) {
  const category = await Controller_category.getAll();
  // console.log("=============="+category);
  res.render("product/addProduct", { category: category });
});

router.get("/update-product/", async (req, res, next) => {});

router.get("/getall-product", async function (req, res, next) {
  try {
    const products = await Controller_product.getAll();
    // res.json(products);
    res.render("product/getall", { sp: products });
  } catch (error) {
    console.error("error get all product " + error);
  }
});

//add product
router.post(
  "/add-product",
  [middleware.single("product_img")],
  async function (req, res, next) {
    console.log("======");
    try {
      let { file } = req;
      console.log("======"+{file});
      let { product_name, product_img, product_price, product_category } =
        req.body;
      product_img = file ? file.filename : "";
      product_img = product_img
        ? `${getConstants().HOST}/images/${product_img}`
        : "";
      const all = await Controller_product.getAll();
      const _code = all.length + 1;
      const product_code = code(_code);
      console.log("=============" + product_category);

      const add = await Controller_product.addProduct(
        product_code,
        product_name,
        product_img,
        product_price,
        product_category
      );
      // res.status(200).json(add);
      res.redirect("/product/getall-product").json(add);
    } catch (error) {
      console.error("error get all product" + error);
    }
  }
);

//set product code
const code = (_code) => {
  let card_code = "";
  if (card_code.length < 10) {
    card_code += "00" + _code;
  }
  if (card_code > 9 && card_code < 100) {
    card_code += "0" + _code;
  }
  if (card_code >= 100) {
    card_code += "" + _code;
  }
  return card_code;
};

//get detail
router.get("/detail-product/:_id", async function (req, res, next) {
  let { _id } = req.params;
  try {
    const getdetail = await Controller_product.getDetailProduct(_id);
    let category = await Controller_category.getAll();
    // console.log(getdetail, category);
    category = category.map((p, index) => {
      return {
        _id: p.id,
        category_name: p.category_name,
        category_description: p.category_description,
        isSelected:
          p._id.toString() == getdetail.product_category._id.toString(),
      };
    });
    // res.status(200).json(getdetail);
    res.render("product/updateProduct", { getdetail, category });
  } catch (error) {
    console.log("error get detail product: " + error);
  }
});

//update product
router.post(
  "/update-product/:_id",
  [middleware.single("product_img")],
  async function (req, res, next) {
    try {
      let { _id } = req.params;
      let { file } = req;
      let { product_name, product_img, product_price, product_category } =
        req.body;
      product_img = file ? file.filename : "";
      product_img = product_img
        ? `${getConstants().HOST}/images/${product_img}`
        : "";
      const update = Controller_product.updateProduct(
        _id,
        product_name,
        product_img,
        product_price,
        product_category
      );
      // res.json(update);
      res.redirect("/product/getall-product");
    } catch (error) {
      console.error("error update product: " + error);
    }
  }
);

//delete product
router.delete("/delete-product/:_id", async function (req, res, next) {
  let { _id } = req.params;
  try {
    await Controller_product.deleteProduct(_id);
    res.json({status: true});
  } catch (error) {
    console.error("error delete: "+error);
    res.json({status: false});

  }
});

module.exports = router;
