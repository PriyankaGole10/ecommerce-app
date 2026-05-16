const express = require("express");
const router = express.Router();
const {getFeaturedProducts,getNewProducts,getProductForListing,getProductById} = require("./../handlers/product-handler");
const { getCategories } = require("../handlers/category-handler");
const { getbrands,getBrandsByCategoryId } = require("../handlers/brand-handler");
const {addToWishlist,removeFromWishlist,getWishlistByUserid} = require("../handlers/wishlist-handler");
const {addToCart, removeFromCart,getCartItems,clearCart} = require("../handlers/shopping-cart-handler");
const {addOrder,getcustomerOrders } = require("../handlers/order-handler");


router.get("/home/new-products",async(req,res)=>{
     let newProducts= await getNewProducts();
     res.send(newProducts)
})

router.get("/home/featured-products",async (req,res)=>{
let featuredProducts= await getFeaturedProducts();
     res.send(featuredProducts)
})

router.get("/category",async (req,res)=>{
let categories= await getCategories();
     res.send(categories)
})

router.get("/brands",async (req,res)=>{
let brands= await getbrands();
     res.send(brands)
})

router.get("/brands/:categoryId", async (req,res)=>{
     const categoryId = req.params.categoryId;
     let brands = await getBrandsByCategoryId(categoryId)
 res.send(brands)
})

router.get("/products",async (req,res)=>{
     const{searchTerm, categoryId,page,pageSize, sortBy, sortOrder,brandId} = req.query
let products= await getProductForListing(searchTerm, categoryId, page,pageSize,sortBy, sortOrder,brandId);
     res.send(products)
})

router.get("/product/:id",async (req,res)=>{
     let id = req.params["id"];
     const product = await getProductById(id);
     res.send(product)
})

router.get("/wishlists",async(req,res)=>{
     let userId = req.user.id
     let items = await getWishlistByUserid(userId)
     res.send(items);
})

router.post("/wishlists/:id",async(req,res)=>{
     let userId = req.user.id
     let productId = req.params.id
     let item = await addToWishlist(userId,productId)
     res.send(item);
})

router.delete("/wishlists/:id",async(req,res)=>{
     let userId = req.user.id
     let productId = req.params.id
     let item = await removeFromWishlist(userId,productId)
     res.send({message: "ok"});
})

router.get("/carts",async(req,res)=>{
     let userId = req.user.id
     let items = await getCartItems(userId)
     res.send(items);
})

router.post("/carts/:id",async(req,res)=>{
     let userId = req.user.id
     let productId = req.params.id
     let quantity = req.body.quantity;
     let items = await addToCart(userId,productId,quantity)
     res.send(items);
})

router.delete("/carts/:id",async(req,res)=>{
     let userId = req.user.id
     let productId = req.params.id
     let item = await removeFromCart(userId,productId)
     res.send({message: "ok"});
})

router.post("/order",async(req,res)=>{
     let userId = req.user.id;
     let order = req.body;
     await addOrder(userId,order);
     await  clearCart(userId);
     return res.send({
          message: "Order Created"
     });
})

router.get("/orders",async(req,res)=>{
     let userId = req.user.id;
     let orders = await getcustomerOrders(userId);
     return res.send(orders);
})

module.exports = router;