const fs = require("fs");
const { Product } = require("../models");
//const path = require('path');

exports.getAllProducts = async(req, res) => {
    const products = await Product.findAll();  
    res.status(200).json({
      status: "success",
      timeOfRequest: req.requestTime,
      results: products.length,
      data: {
        products,
      },
    });
  };
  
  exports.addproduct = async(req, res) => {
    let newProduct = Product.build(req.body);
    newProduct = await newProduct.save();
    res.status(200).json({
      status: "success",
      data: {
        product: newProduct,
      },
    });
  };
  
  exports.getProductById = async(req, res) => {
    const foundProduct = await Product.findByPk(req.params.id);
    if(foundProduct){

      res.status(200).json({
        status: "success",
        data: {
          products: foundProduct,
        },
      });
    } else{
        res.status(404).json({
          status: "not found",
        });
    }
  };
  
  exports.updateProductById = (req, res) => {
    const products = JSON.parse(fs.readFileSync(`${__dirname}/../data/products.json`));
    
    let edito = false;
    for (const producto of products) {
      console.log(producto.id, req.params.id);
    
      if (producto.id == req.params.id) {
        edito = true;
        producto.name = req.body.name;
        producto.price = req.body.price;
        producto.category = req.body.category;
      }
    }

    if (!edito) return res.status(404).json({status: "not found"}); 
    
    return res.status(200).json({
      status: "success", data: { product: products },
  });
}
  
  
  exports.deleteProductById = (req, res) => {
    const products = JSON.parse(
      fs.readFileSync(`${__dirname}/../data/products.json`)
      );
    const position = products.findIndex(x => x.id == req.params.id);
    products.splice(position, 1);

    fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));
    res.status(200).json({
      status: "Archivo borrado correctamente",
    });
  }
  