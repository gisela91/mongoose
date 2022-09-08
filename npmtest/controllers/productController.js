const fs = require("fs");
const Product = require("../models/Product");
//const path = require('path');

exports.getAllProducts = async (req, res) => {

    const products = await Product.find();
    console.log(products);
    res.status(200).json({
      status: "success",
      timeOfRequest: req.requestTime,
      results: products.length,
      data: {
        products,
      },
      
    });
  }
  
  exports.addproduct = async(req, res) => {
    //const product = new Product({});
    const newProduct = await Product.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        product: newProduct,
      },
    });
  }
  
  exports.getProductById = async(req, res) => {
    const foundProduct = await Product.findById(req.params.id);
    //console.log(req.params);
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
  };
  
  exports.updateProductById = async(req, res) => {
    const product = await Product.findById(req.params.id);
    
      if (product) {
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
}
  
  
  exports.deleteProductById = async(req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    //console.log(product);
    res.status(200).json({
      status: "Archivo borrado correctamente",  
      product: product,
    });
  }
  