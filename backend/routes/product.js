const {addProduct,getallProducts,getProductById,updateProduct,
    deleteProduct} = require("./../handlers/product-handler")
const express = require("express")
const router = express.Router();



router.get("", async(req,res)=>{
    let result =  await getallProducts();
    res.send(result)
})

router.post("", async (req,res)=>{
    let model = req.body
    let result =  await addProduct(model);
    res.send(result)
})

router.get("/:id",async(req,res)=>{
    let id = req.params["id"]
    let result =  await getProductById(id);
    res.send(result);
})

router.put("/:id",async(req,res)=>{
    let id = req.params["id"];
      let model = req.body;
    await updateProduct(id,model);
    res.send({msg:"Product updated"})
})

router.delete("/:id",async (req,res)=>{
    let id = req.params["id"];
    await deleteProduct(id);
    res.send({msg:"Product deleted"})
})


module.exports = router;
