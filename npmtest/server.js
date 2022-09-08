const mongoose = require("mongoose");
const Product = require("./models/Product");
const app = require("./app");
const port = process.env.PORT || 3032;
const url= 'mongodb://localhost:27017/fullstack';
mongoose.connect(url, {}).then((con) => {
    console.log("Connected to mongo");
    /*
    const p = new Product({ productName:"producto 2", price: 10});
    p.save().then(() => {
        console.log("saved");
    });
    */
});
app.listen(port, () =>{
    console.log(`App running on port ${port}`);
});