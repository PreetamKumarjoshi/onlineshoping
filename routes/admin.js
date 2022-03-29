const express           = require("express");

const adminController   = require("../controllers/admin");

const routes            = express.Router();

routes.get("/add-product",adminController.getAddProduct);

// /admin/products

routes.post("/save-product",adminController.postAddProduct);

routes.post("/save-edit-product",adminController.postEditProduct);

routes.get("/products",adminController.getProducts);

routes.post("/add-product",adminController.postAddProduct);

routes.post("/edit-product/:productId",adminController.editproduct);

routes.post("/delete-product",adminController.postDeleteProduct);



module.exports          = routes;