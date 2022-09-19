const fs = require("fs");
const Product = require("../models/Product");
const catchAsync= require("../utils/catchAsync");

exports.getAllProducts = catchAsync(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    }, 
  });
});
  
exports.addproduct = catchAsync(async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});
  
exports.getProductById = catchAsync(async (req, res) => {
  const foundProduct = await Product.findById(req.params.id);
  if(foundProduct){
    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else{
      res.status(404).json({
        status: "not found",
      });
  }
});
exports.updateProductById = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if(product) {
    product.productName = req.body.productName;
    product.price = req.body.price;
    res.status(200).json({
      status: "success",
      data: {
         product: product,
      }
    });
  }else{
    res.status(404).json({
      status: "not found",
    });
  }
});

exports.deleteProductById = catchAsync(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  //console.log(product);
  if(product){
    res.status(200).json({
      product: product,
      status: "Producto borrado correctamente",  
  });
  }else{
    res.status(404).json({
      status: "no existe el producto",
    });
  }
 
});
