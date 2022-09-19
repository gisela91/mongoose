const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    inCart: {
        type: Boolean,
        defaut: false,
    }
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;