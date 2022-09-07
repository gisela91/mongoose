const app = require("./app");
const port = process.env.PORT || 3032;
app.listen(port, () =>{
    console.log(`App running on port ${port}`);
});