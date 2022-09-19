const mongoose = require("mongoose");
const shopingCartSchema = new mongoose.Schema({
    estado: {
        type: String,
        required: false,
    },
    productName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    }
});
const Shoping_cart= mongoose.model("Shoping_cart", shopingCartSchema);
module.exports = Shoping_cart;