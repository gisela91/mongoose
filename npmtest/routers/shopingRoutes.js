const express = require("express");
const shopingController= require("../controllers/shopingCartController");
const authController= require("../controllers/authController");
const shopingRouter = express.Router();
//routes
shopingRouter
  .route("/")
  .all(authController.protect)
  .get(shopingController.getProductsCart)
  .delete(shopingController.deleteProductsCart);

shopingRouter
  .route("/product")
  .all(authController.protect)
  .post(shopingController.addProductCart);

shopingRouter
  .route("/:id")
  .all(authController.protect)
  .delete(shopingController.deleteProductCartById);

shopingRouter
  .route("/pay")
  .all(authController.protect)
  .post(shopingController.payCart);

module.exports = shopingRouter;

