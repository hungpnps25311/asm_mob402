var express = require("express");
var router = express.Router();
const Controller_category = require("../controllers/Controller_category");

/* GET home page. */
router.get("/getall-category", async function (req, res, next) {
  // res.render('index', { title: 'Express' });
  try {
    let category = await Controller_category.getAll();
    category = category.map((p, index) => {
      return {
        _id: p._id,
        category_name: p.category_name,
        category_desciption: p.category_desciption,
        index: index + 1,
      }
    });
    res.status(200).json(category);
  // res.render('category/getall', { sp: category });

  } catch (error) {
    console.error("error get all book" + error);
  }
});

router.get('/add-category', async function (req, res, next) {
  res.render('category/addCategory');

});

router.post("/add-category", async function (req, res, next) {
  try {
    let { category_name, category_desciption } = req.body;
    console.log(category_name);
    console.log(category_desciption);
    const add = await Controller_category.addCategory(
      category_name,
      category_desciption      
    );
    res.status(200).json(add);
  } catch (error) {
    console.error("error get all category: " + error);
  }
});

router.post("/update-category/:_id", async function (req, res, next) {
  let { _id } = req.params;
  let { category_name, category_desciption, category_product } = req.body;
  try {
    const update = await Controller_category.updateCategory(
      _id,
      category_name,
      category_desciption,
      category_product
    );
    res.status(200).json(update);
  } catch (error) {
    console.error("error get all book" + error);
  }
});

router.delete("/delete-category/:_id", async function (req, res, next) {
  let { _id } = req.params;
  try {
    const getdetail= await Controller_category.deleteCategory(_id);
    res.status(200).json(getdetail);
  } catch (error) {
    console.error("error get detail category" + error);
  }
});

router.get("/getdetail-category/:_id", async function (req, res, next) {
  let { _id } = req.params;
  try {
    const getdetail= await Controller_category.getDetailCategory(_id);
    res.status(200).json(getdetail);
  } catch (error) {
    console.error("error get detail category" + error);
  }
});

module.exports = router;
