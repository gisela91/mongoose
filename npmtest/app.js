const express = require("express");
const morgan = require("morgan");
const productRouter = require("./routers/productRouters");
const app = express();
//middlewers
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
})
//routers
app.use("/api/v1/products", productRouter);

module.exports = app;
