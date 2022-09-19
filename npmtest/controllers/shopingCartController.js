const fs = require("fs");
const product = require("../models/Product");
const cart = require("../models/Shoping_cart");
const catchAsync= require("../utils/catchAsync");

exports.addProductCart = catchAsync(async (req, res) => {
  const {productName, price } = req.body;
  const estaEnProducts = await product.findOne({ productName });
  const noEstaVacio = productName !== "" && price !== "";
  let estaEnElCarrito = await cart.findOne({ productName });
  const car = await cart.find();
  let edito=false;
  for (const estaEstadoPend of car) {
    if (estaEstadoPend.estado == "PENDING") {
      edito = true;
    }
  }
  if (!estaEnProducts) {
    res.status(400).json({
      mensaje: "Este producto no se encuentra en nuestra base de datos",
    });
  }
  else{ 
    let Product = await product.findById(estaEnProducts.id);
    if (noEstaVacio && !estaEnElCarrito) {
      if(edito==true||car.length>=0){
        let newProductInCart = await cart.create({estado: "PENDING", productName, price, amount: 1 });
          res.status(200).json({
            mensaje: `El producto fue agregado al carrito`,
            estaEnProducts,
          });
        }       
      }
      else {
        if (estaEnElCarrito) {
          if(edito==false){
            estaEnElCarrito.amount=1;
            estaEnElCarrito.estado="PENDING";
            estaEnElCarrito.save();
            res.status(400).json({
              mensaje: "El producto ya cancelado se elimino, y se agrego el producto",
              estaEnProducts,
          });
          }else{
            estaEnElCarrito.amount+=1;
            estaEnElCarrito.save();
            res.status(400).json({
              mensaje: "El producto se adiciono en cantidad",
              estaEnProducts,
          });
          }
        }}
        Product.productName = productName; 
        Product.price = price;
        Product.inCart = true;
        Product.save();
}
});

exports.deleteProductCartById = catchAsync(async (req, res) => {
  const productIdCart = await cart.findById(req.params.id);
  const name=productIdCart.productName;
  const productNames = await product.findOne({ productName: productIdCart.productName });
  const car = await cart.find();
  let edito=false;
  for (const estaEstadoPend of car) {
   if (estaEstadoPend.estado == "PENDING") {
     edito = true;
   }
 }
 if(productIdCart && edito==true){
    const prodDelete = await cart.findByIdAndDelete(productIdCart);
    productNames.inCart = false;
    productNames.save();
    res.status(200).json({
      status: "El producto a sido eliminado del carrito",
  });
  }else{
    res.status(404).json({
    status:"El producto esta pagado, no se puede eliminar del carrito",
  });
  }
});

exports.payCart= catchAsync(async (req, res) => {
  const car = await cart.find();
  let pay=0;
  let edito=false;
  for (const estaEstadoPend of car) {
   if (estaEstadoPend.estado == "PENDING") {
     edito = true;
   }
 }
 if(edito==true && car.length>0){
  for(const cart of car){
    if(cart.estado=="PENDING"){
      pay =pay+(cart.price*cart.amount);
      cart.estado="PAY";
      cart.save();
    } }
    res.status(200).json({
      Monto_Pagar: pay,
      mensaje: "Los productos se pagaron con exito",
   });
  }else{
    res.status(200).json({
      status: "No hay pendientes en el carrito",
   });
  }
});

//-------------------------------------------------------------
exports.getProductsCart = catchAsync(async (req, res) => {
  const productsCart = await cart.find();
  if (productsCart) {
    res.json({ 
      productsCart 
    });
  } else {
    res.json({ 
      mensaje: "No hay productos en el carrito" 
    });
  }
});

exports.deleteProductsCart = catchAsync(async (req, res) => {
  const Cart = await cart.find();
  for (const limpiarCart of Cart) {
    if (Cart.length >0) {
      const limp=await cart.findByIdAndDelete(Cart.id);
    }
  }  res.json({ 
      mensaje: "Carrito Vacio" 
    });
});
