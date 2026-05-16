require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const app =express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const categoryRoute = require("./routes/category");
const brandRoute = require("./routes/brand")
const productRoute = require("./routes/product")
const customerRoute = require("./routes/customer")
const reviewRoute = require("./routes/review")
const orderRoute = require("./routes/order")
const authRoute = require("./routes/auth")
const paymentRoute  = require("./routes/payment")

// MIDDLEWARE
const {verifyToken,isAdmin} = require("././middlewares/auth-middleware")

// MIDDLEWARES
app.use(cors())
app.use(express.json());
app.get("/", (req,res)=>{
    res.send("Server running");
})

app.use("/category",verifyToken,isAdmin, categoryRoute) ;
app.use("/brand",verifyToken,isAdmin,brandRoute);
app.use("/orders",verifyToken,isAdmin,orderRoute);
app.use("/product",verifyToken,isAdmin,productRoute);
app.use("/customer",verifyToken,customerRoute);
app.use("/reviews",verifyToken,reviewRoute);
app.use("/payments",verifyToken,paymentRoute);
app.use("/auth",authRoute);



async function connectDb(){
    await mongoose.connect('mongodb://localhost:27017/',{
     dbName:'e-comm_store_db'
});
console.log("mongodb connected")
}

connectDb().catch((err)=>{
    console.error(err);
})

app.listen(port, ()=>{
    console.log('Server running on port', 3000)
})

