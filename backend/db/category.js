const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    isAdmin:Boolean,

})

const Category = mongoose.model("categories", categorySchema);
module.exports = Category;