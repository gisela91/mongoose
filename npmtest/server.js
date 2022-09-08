const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 3032;
mongoose.connect(process.env.DATABASE, {}).then((con)=> {
    console.log("Connected--------", con.connections);
});
app.listen(port, () =>{
    console.log(`App running on port ${port}`);
});